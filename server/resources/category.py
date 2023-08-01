import json

from flask import request
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from managers.category import CategoryManager
from models import RoleType
from schemas.request.category import CreateCategoryRequestSchema
from schemas.response.category import (
    CreateCategoryResponseSchema,
    CategoryBaseInfoResponseSchema,
)
from utils.decorators import permission_required, validate_schema


class Category(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(CreateCategoryRequestSchema)
    def post():
        new_category = CategoryManager.create(request.get_json())
        schema = CreateCategoryResponseSchema()
        return schema.dumps(new_category)

    @staticmethod
    def get():
        category_title = request.args.get("category")
        schema = CreateCategoryResponseSchema()
        if not category_title:
            categories = CategoryManager.get_all()
            category_only_base_info_schema = CategoryBaseInfoResponseSchema()
            return category_only_base_info_schema.dumps(categories, many=True)

        if category_title == "all":
            categories = CategoryManager.get_all()
            return schema.dumps(categories, many=True)

        elif category_title:
            category = CategoryManager.get_by_name(category_title)
            return schema.dumps(category)

        raise BadRequest("You should use query parameters, check the documentation!")


class CategoryHandel(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    def get(id_):
        print(id_)
        category = CategoryManager.get_by_id(id_)
        schema = CategoryBaseInfoResponseSchema()
        return schema.dumps(category)

    @staticmethod
    @permission_required(RoleType.admin)
    def put(id_):
        category = CategoryManager.edit_category(id_, request.get_json())
        schema = CreateCategoryResponseSchema()
        return schema.dumps(category)

    @staticmethod
    @permission_required(RoleType.admin)
    def delete(id_):
        result = CategoryManager.delete(id_)
        return json.dumps(result)
