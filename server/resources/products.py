from flask import request
from flask_restful import Resource

from managers.products import ProductManager
from models import RoleType
from schemas.request.product import CreateProductRequestSchema
from schemas.response.product import CreateProductResponseSchema
from utils.decorators import validate_schema, permission_required, token_required


class Products(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(CreateProductRequestSchema)
    def post():
        product = ProductManager.create_product(request.get_json())
        schema = CreateProductResponseSchema()
        return schema.dumps(product)
