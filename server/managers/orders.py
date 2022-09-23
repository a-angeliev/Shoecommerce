from werkzeug.exceptions import NotFound

from managers.products import ProductManager
from models.orders import OrderItemModel, OrdersModel
from utils.operations import db_add_items


class OrdersManager:
    @staticmethod
    def create_order(user, data):
        order_items = []
        total_price = 0
        pairs = []

        for order_item_info in data["order_items"]:
            product = ProductManager.get_one(order_item_info["product_id"])
            pair = [
                x
                for x in product.pairs
                if x.id == order_item_info["pair_id"] and x.quantity is not 0
            ]
            if not pair:
                raise NotFound("It not available some of products in your order.")
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
            order_i = OrderItemModel(**order_i_data)
            order_items.append(order_i)
            total_price += price

        order = OrdersModel(total_price=total_price, comment=data["comment"])
        [order.order_items.append(x) for x in order_items]
        user.user_data.orders.append(order)

        pairs = ProductManager.sell_pair(pairs)
        db_add_items(order, user, *pairs)

        return order

    @staticmethod
    def get_all():
        orders = OrdersModel.query.all()
        return orders


