import json
from datetime import datetime, timedelta

import jwt
from decouple import config
from flask_restful import Resource

from managers.auth import AuthManager
from managers.users import UserManager
from flask import request

from models import RoleType
from schemas.request.users import RegisterUserRequestSchema, LoginUserRequestSchema
from utils.decorators import validate_schema






class Register(Resource):
    @validate_schema(RegisterUserRequestSchema)
    def post(self):
        user = UserManager.register(request.get_json())
        token = AuthManager.encode_token(user)
        resp = {"token": token, "user_id": user.id, "role": RoleType[user.role]}
        return json.dumps(resp), 201
