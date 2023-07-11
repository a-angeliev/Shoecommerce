import json

from flask import request
from flask_restful import Resource

from managers.products import ProductManager
from models import RoleType
from schemas.request.product import (
    CreateProductRequestSchema,
    EditProductBaseInformationRequestSchema,
    CreateProductImageRequestSchema,
    DeleteProductImageRequestSchema,
    CreatePorductPairRequestSchema,
    DeleteProductPairRequestSchema, EditProductImageRequestSchema, EditProductPairRequestSchema,
)
from schemas.response.product import (
    CreateProductResponseSchema,
    AddImageProductResponseSchema,
    AddProductPairResponseSchema,
    EditProductPairResponseSchema, ProductAdminResponseSchema,
)
from utils.decorators import validate_schema, permission_required, token_required
from utils.validators import validate_if_admin


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

        if validate_if_admin():
            products = ProductManager.get_all(for_admin=True)
            schema = ProductAdminResponseSchema()
        else:
            products = ProductManager.get_all()
            schema = CreateProductResponseSchema()
        return schema.dumps(products, many=True)


class Product(Resource):
    @staticmethod
    def get(id_):
        if validate_if_admin():
            product = ProductManager.get_one(id_, for_admin=True)
        else:
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


class ProductImages(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(CreateProductImageRequestSchema)
    def post(id_):
        image = ProductManager.add_image(id_, request.get_json())
        schema = AddImageProductResponseSchema()
        return schema.dumps(image)

    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(DeleteProductImageRequestSchema)
    def delete(id_):
        response = ProductManager.delete_image(id_, request.get_json())
        return response

    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(EditProductImageRequestSchema)
    def put(id_):
        response = ProductManager.edit_image(id_, request.get_json())
        return json.dumps(response)


class ProductPairs(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(CreatePorductPairRequestSchema)
    def post(id_):
        pair = ProductManager.add_pair(id_, request.get_json())
        schema = AddProductPairResponseSchema()
        return schema.dumps(pair)

    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(DeleteProductPairRequestSchema)
    def delete(id_):
        response = ProductManager.delete_pair(id_, request.get_json())
        return response

    # @staticmethod
    # @permission_required(RoleType.admin)
    # def put(id_):
    #     pair = ProductManager.edit_pair()
    #

class ProductPairEdit(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(EditProductPairRequestSchema)
    def put(id_, pair_id):
        pair = ProductManager.edit_pair(id_, pair_id, request.get_json())
        schema = EditProductPairResponseSchema()
        return schema.dumps(pair)
