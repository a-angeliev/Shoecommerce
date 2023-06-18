import json
from datetime import datetime, timedelta

import jwt
from decouple import config
from flask_restful import Resource
from werkzeug.exceptions import Forbidden

from managers.auth import AuthManager
from managers.users import UserManager
from flask import request

from models import RoleType
from schemas.request.users import (
    RegisterUserRequestSchema,
    LoginUserRequestSchema,
    EditUserRequestSchema,
)
from schemas.response.auth import UserResponseSchema
from schemas.response.comments import GetUserCommentsResponseSchema
from schemas.response.order import GetUserOrdersResponseSchema
from utils.decorators import validate_schema, token_required


class Register(Resource):
    @validate_schema(RegisterUserRequestSchema)
    def post(self):
        user = UserManager.register(request.get_json())
        token = AuthManager.encode_token(user)
        resp = {"token": token, "user_id": user.id, "role": RoleType[user.role]}
        return json.dumps(resp), 201


class User(Resource):
    @staticmethod
    @token_required
    def get(user, id_):
        print(user)
        if user.id == id_:
            schema = UserResponseSchema()
            return schema.dumps(user), 200
        raise Forbidden("You dont have permission to this resource!")

    @staticmethod
    @token_required
    @validate_schema(EditUserRequestSchema)
    def put(user, id_):
        if user.id == id_:
            req_data = request.get_json()
            user = UserManager.edit(req_data, id_)
            schema = UserResponseSchema()
            return schema.dumps(user), 201
        raise Forbidden("You dont have permission to this resource!")


class UserComments(Resource):
    @staticmethod
    def get(id_):
        comments = UserManager.get_comments(id_)
        schema = GetUserCommentsResponseSchema()
        return schema.dumps(comments, many=True)


class UserOrders(Resource):
    @staticmethod
    @token_required
    def get(user, id_):
        if user.id != id_:
            raise Forbidden("You dont have permission to this resource!")
        orders = UserManager.get_orders(id_)
        print(orders[0])
        schema = GetUserOrdersResponseSchema()
        return schema.dumps(orders, many=True)
