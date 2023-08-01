import json

from flask import request
from flask_restful import Resource

from managers.orders import OrdersManager
from models import RoleType
from schemas.request.order import (
    CreateOrderRequestSchema,
    ChangeOrderStatusRequestSchema,
)
from schemas.response.order import (
    CreateOrderResponseSchema,
    GetAllOrdersResponseSchema,
    GetUserOrdersResponseSchema,
)
from utils.decorators import token_required, validate_schema, permission_required


class Orders(Resource):
    @staticmethod
    @token_required
    @validate_schema(CreateOrderRequestSchema)
    def post(user):
        order = OrdersManager.create_order(user, request.get_json())
        schema = CreateOrderResponseSchema()
        return schema.dumps(order)

    @staticmethod
    @permission_required(RoleType.admin)
    def get():
        orders = OrdersManager.get_all()
        schema = GetAllOrdersResponseSchema()
        return schema.dumps(orders, many=True)


class ChangeOrder(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(ChangeOrderStatusRequestSchema)
    def post(id_):
        order = OrdersManager.edit_order_status(id_, request.get_json())
        schema = GetAllOrdersResponseSchema()
        return schema.dumps(order)


class Order(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    def get(id_):
        order = OrdersManager.get_one(id_)
        schema = GetUserOrdersResponseSchema()
        return schema.dumps(order)


class OrderStatistic(Resource):
    @staticmethod
    def get():
        orders = OrdersManager.monthly_statistic()
        # return json.dumps(orders)
        return orders
