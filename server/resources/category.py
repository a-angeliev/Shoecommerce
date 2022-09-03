from flask import request
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from managers.category import CategoryManager
from models import RoleType
from schemas.request.category import CreateCategoryRequestSchema
from schemas.response.category import CreateCategoryResponseSchema
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

        if category_title == "all":
            try:
                categories = CategoryManager.get_all()
                return schema.dumps(categories, many=True)
            except:
                raise BadRequest(
                    "There is problem with server, please excuse us. The problem will be fix as soon as possible!"
                )

        elif category_title:
            try:
                category = CategoryManager.get_by_name(category_title)
                return schema.dumps(category)
            except:
                raise BadRequest("There is no category with that title")
        raise BadRequest("You should use query parameters, check the documentation!")
