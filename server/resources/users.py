from flask_restful import Resource


from managers.users import UserManager
from flask import request

from schemas.request.users import RegisterUserRequestSchema
from schemas.response.auth import RegisterResponseUser
from utils.decorators import validate_schema


class Users(Resource):
    pass


class Register(Resource):
    @validate_schema(RegisterUserRequestSchema)
    def post(self):

        requ = request.get_json()
        user = UserManager.register(requ)
        schema = RegisterResponseUser()

        return schema.dump(user)
