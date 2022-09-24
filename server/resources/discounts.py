import json
from datetime import datetime

from flask import request
from flask_restful import Resource

from managers.discounts import DiscountsManager
from models import RoleType
from schemas.request.discounts import (
    CreateDiscountRequestSchema,
    CheckIsDiscountIsValidRequestSchema,
)
from schemas.response.discounts import (
    CreateDiscountsResponseSchema,
    GetAllDiscountsResponseSchema,
)
from utils.decorators import permission_required, validate_schema


class Discounts(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    @validate_schema(CreateDiscountRequestSchema)
    def post():
        discount_data = request.get_json()
        discount_data["started_on"] = datetime.strptime(
            discount_data["started_on"], "%Y-%m-%dT%H:%M:%S.%fZ"
        )
        discount_data["ended_on"] = datetime.strptime(
            discount_data["ended_on"], "%Y-%m-%dT%H:%M:%S.%fZ"
        )
        result = DiscountsManager.create(discount_data)
        schema = CreateDiscountsResponseSchema()
        return schema.dumps(result)

    @staticmethod
    @permission_required(RoleType.admin)
    def get():
        discounts = DiscountsManager.get_all()
        schema = GetAllDiscountsResponseSchema()
        return schema.dumps(discounts, many=True)


class DiscountsOperations(Resource):
    @staticmethod
    @permission_required(RoleType.admin)
    def delete(id_):
        result = DiscountsManager.delete(id_)
        return json.dumps(result)


class DiscountValidation(Resource):
    @staticmethod
    @validate_schema(CheckIsDiscountIsValidRequestSchema)
    def post():
        discount_is_valid = DiscountsManager.is_valid(request.get_json())
        return json.dumps(discount_is_valid)
