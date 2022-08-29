from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import BadRequest, InternalServerError

from db import db
from models import UsersModel, UserData
from werkzeug.security import generate_password_hash, check_password_hash


class UserManager:
    @staticmethod
    def register(requ_user_data):
        user_data = UserData(**requ_user_data["user_data"])

        prime_user_data = {k: v for k, v in requ_user_data.items() if k != "user_data"}
        prime_user_data["password"] = generate_password_hash(
            prime_user_data["password"]
        )
        user = UsersModel(**prime_user_data)
        try:
            db.session.add(user_data)
            db.session.add(user)
            user.user_data = user_data
            db.session.flush()
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Please login")
            else:
                InternalServerError("Server is unavailable.")
        return user

    @staticmethod
    def login(requ_user_data):
        user = UsersModel.query.filter_by(email=requ_user_data['email']).first()
        if not user:
            raise BadRequest("Wrong email or password!")

        if not check_password_hash(user.password, requ_user_data['password']):
            raise BadRequest("Wrong email or password!")

        return user
