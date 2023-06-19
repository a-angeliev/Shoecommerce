from flask import request
from flask_restful import Resource

from managers.wishes import WishesManager
from schemas.bases_schemas import ProductIdResponseSchema
from schemas.response.auth import UserResponseSchema
from schemas.response.product import CreateProductResponseSchema
from utils.decorators import token_required


class Wishes(Resource):
    @staticmethod
    @token_required
    def post(user):
        product = WishesManager.create_wish(user, request.get_json())
        # schema = ProductIdResponseSchema()
        schema = CreateProductResponseSchema()
        return schema.dumps(product), 200

    @staticmethod
    @token_required
    def delete(user):
        product_id = WishesManager.delete_wish(user, request.get_json())
        schema = ProductIdResponseSchema()
        return schema.dumps(product_id), 202

    @staticmethod
    @token_required
    def get(user):
        products = WishesManager.get_all(user)
        schema = CreateProductResponseSchema()
        return schema.dumps(products, many=True)
