import json

from flask import request
from flask_restful import Resource

from managers.auth import AuthManager
from managers.users import UserManager
from models import RoleType
from schemas.request.users import LoginUserRequestSchema
from utils.decorators import validate_schema


class Login(Resource):
    @validate_schema(LoginUserRequestSchema)
    def post(self):
        # print(request.get_json())
        user = UserManager.login(request.get_json())
        token = AuthManager.encode_token(user)
        resp = {"token": token, "user_id": user.id, "role": RoleType[user.role]}
        return json.dumps(resp), 200
