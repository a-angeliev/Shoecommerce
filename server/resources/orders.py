from flask import request
from flask_restful import Resource

from managers.orders import OrdersManager
from schemas.request.order import CreateOrderRequestSchema
from schemas.response.order import CreateOrderResponseSchema
from utils.decorators import token_required, validate_schema


class Orders(Resource):
    @staticmethod
    @token_required
    @validate_schema(CreateOrderRequestSchema)
    def post(user):
        order = OrdersManager.create_order(user, request.get_json())
        schema = CreateOrderResponseSchema()
        return schema.dumps(order)
