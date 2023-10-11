import json
from datetime import datetime, date, timedelta

from flask import request
from werkzeug.exceptions import NotFound

from managers.discounts import DiscountsManager
from managers.products import ProductManager
from models.enums import IsShipped
from models.orders import OrderItemModel, OrdersModel, OrderAddressModel
from utils.operations import db_add_items


class OrdersManager:
    @staticmethod
    def create_order(user, data):
        order_items = []
        total_price = 0
        pairs = []
        discount_is_valid = DiscountsManager.is_valid(data)
        for order_item_info in data["order_items"]:
            product = ProductManager.get_one(order_item_info["product_id"])
            print(product.images[0].img_url)
            pair = [
                x
                for x in product.pairs
                if x.id == order_item_info["pair_id"] and x.quantity is not 0
            ]
            if not pair:
                raise NotFound("Some of the products in your order are not available.")
            pair = pair[0]
            pairs.append(pair)

            price = product.price - product.discount

            order_i_data = {
                "price": price,
                "title": product.title,
                "pair_size": pair.size,
                "pair_color": pair.color,
                "product_id": product.id,
            }
            order_i = OrderItemModel(img=product.images[0].img_url, **order_i_data)
            order_items.append(order_i)
            total_price += price

        if discount_is_valid["is_valid"]:
            final_price = total_price - (
                total_price * discount_is_valid["discount"] / 100
            )
        else:
            final_price = total_price

        order_address = OrderAddressModel(**data["address"])
        order = OrdersModel(
            total_price=total_price,
            final_price=final_price,
            comment=data["comment"],
            discount_code=data["discount_code"],
            order_address=[order_address],
        )

        [order.order_items.append(x) for x in order_items]
        user.user_data.orders.append(order)

        pairs = ProductManager.sell_pair(pairs)
        db_add_items(order, user, order_address, *pairs)

        return order

    @staticmethod
    def get_all():
        orders = OrdersModel.query.all()
        return orders

    @staticmethod
    def edit_order_status(order_id, data):
        order = OrdersModel.query.filter_by(id=order_id).first()
        if not order:
            raise NotFound("There is no order with that id.")

        order.is_shipped = IsShipped[data["status"]]
        if data["status"] == "shipped":
            order.shipped_on = datetime.now()
        else:
            order.shipped_on = None
        db_add_items(order)
        return order

    @staticmethod
    def get_one(order_id):
        order = OrdersModel.query.filter_by(id=order_id).first()
        if not order:
            raise NotFound("There is no order with that id.")
        return order

    @staticmethod
    def monthly_statistic():
        current_date = (date.today() + timedelta(days=1)).isoformat()
        days_before = (date.today() - timedelta(days=30)).isoformat()

        start_time = datetime.fromisoformat(days_before)
        end_time = datetime.fromisoformat(current_date)

        orders = OrdersModel.query.filter(
            OrdersModel.created_on.between(start_time, end_time)
        ).all()

        response = [
            {
                "created_on": x.created_on.strftime("%Y-%m-%d"),
                "total_price": x.total_price,
                "status": x.is_shipped,
            }
            for x in orders
        ]
        chart_data = []

        for day in range(0, 32):
            cur_date = (date.today() - timedelta(days=day)).isoformat()
            chart_data.append({"date": cur_date, "orders": 0, "total_price": 0})

        monthly_shipped_orders_number = 0
        monthly_orders_number = 0
        monthly_shipped_orders_price = 0
        monthly_orders_price = 0
        for order in response:
            for day in chart_data:
                if day["date"] == order["created_on"]:
                    day["orders"] += 1
                    monthly_orders_number += 1

                    day["total_price"] += order["total_price"]
                    monthly_orders_price += order["total_price"]

                    if order["status"] == "shipped":
                        monthly_shipped_orders_number += 1
                        monthly_shipped_orders_price += order["total_price"]

                    break

        chart_data.reverse()

        return {
            "chart_data": chart_data,
            "monthly_shipped_orders_number": monthly_shipped_orders_number,
            "monthly_orders_number": monthly_orders_number,
            "monthly_shipped_orders_price": monthly_shipped_orders_price,
            "monthly_orders_price": monthly_orders_price,
        }
