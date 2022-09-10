from flask import request
from flask_restful import Resource

from managers.products import ProductManager
from models import RoleType
from schemas.request.product import CreateProductRequestSchema, EditProductBaseInformationRequestSchema
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

    @staticmethod
    def get():
        products = ProductManager.get_all()
        schema = CreateProductResponseSchema()
        return schema.dumps(products, many=True)


class Product(Resource):
    @staticmethod
    def get(id_):
        product = ProductManager.get_one(id_)
        schema = CreateProductResponseSchema()
        return schema.dumps(product)

    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(EditProductBaseInformationRequestSchema)
    def put(id_):
        product = ProductManager.edit_product_base_info(id_, request.get_json())
        schema = CreateProductResponseSchema()
        return schema.dumps(product)

    @staticmethod
    @permission_required(RoleType.admin)
    def delete(id_):
        response = ProductManager.delete_product(id_)
        return response

