from datetime import datetime, timedelta

import jwt
from decouple import config
from flask_httpauth import HTTPTokenAuth
from werkzeug.exceptions import BadRequest

from models import UsersModel


class AuthManager:
    @staticmethod
    def encode_token(user):
        payload = {"sub": user.id, "exp": datetime.utcnow() + timedelta(days=100)}
        return jwt.encode(payload, key=config("JWT_KEY"), algorithm="HS256")

    @staticmethod
    def decode_token(token):
        try:
            data = jwt.decode(token, key=config("JWT_KEY"), algorithms=["HS256"])
            return data["sub"]
        except jwt.ExpiredSignatureError:
            raise BadRequest("Token expired")
        except jwt.InvalidTokenError:
            raise BadRequest("Invalid Token")
