from flask import request
from flask_restful import Resource

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
