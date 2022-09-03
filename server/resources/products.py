from flask import request
from flask_restful import Resource

from managers.products import ProductManager
from schemas.request.product import CreateProductRequestSchema
from schemas.response.product import CreateProductResponseSchema
from utils.decorators import validate_schema


class Products(Resource):
    @staticmethod
    @validate_schema(CreateProductRequestSchema)
    def post():
        # ProductManager.create_product()
        product = ProductManager.create_product(request.get_json())
        schema = CreateProductResponseSchema()
        return schema.dumps(product)
