from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import BadRequest, InternalServerError, NotFound

from db import db
from models import UsersModel, UserData
from werkzeug.security import generate_password_hash, check_password_hash

from schemas.response.comments import GetUserCommentsResponseSchema


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
    def edit(requ_user_data, id):
        user_q = UsersModel.query.filter_by(id=id)
        user_data_q = UserData.query.filter_by(user_id=id)
        user = user_q.first()
        user_data = user_data_q.first()

        print(user, user_data)
        if not user or not user_data:
            raise NotFound("This user does not exist.")

        user_data_q.update(requ_user_data["user_data"])
        prime_user_data = {k: v for k, v in requ_user_data.items() if k != "user_data"}
        user_q.update(prime_user_data)

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
        user = UsersModel.query.filter_by(email=requ_user_data["email"]).first()
        if not user:
            raise BadRequest("Wrong email or password!")

        if not check_password_hash(user.password, requ_user_data["password"]):
            raise BadRequest("Wrong email or password!")

        return user

    @staticmethod
    def get_by_id(id_):
        user = UsersModel.query.filter_by(id=id_).first()
        if user is None:
            raise NotFound("There is no user with that id.")
        return user

    @staticmethod
    def get_comments(id_):
        user = UserManager.get_by_id(id_)
        comments = user.user_data.comments
        schema = GetUserCommentsResponseSchema()
        return schema.dumps(comments, many=True)

    # TODO
    # Create Used delete functionality.
