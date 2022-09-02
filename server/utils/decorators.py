from functools import wraps

import jwt
from flask import request, jsonify, make_response
from werkzeug.exceptions import BadRequest, Forbidden, Unauthorized

from managers.auth import AuthManager
from models import UsersModel, RoleType


def validate_schema(schema_name):
    def wrapper(func):
        def decorated_func(*args, **kwargs):
            data = request.get_json()
            schema = schema_name()
            errors = schema.validate(data)
            if errors:
                raise Unauthorized(errors)
            return func(*args, **kwargs)

        return decorated_func

    return wrapper


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        # ensure the jwt-token is passed with the headers
        if "x-access-token" in request.headers:
            token = request.headers["x-access-token"]
            print(token)
        if not token:  # throw error if no token provided
            return make_response(jsonify({"message": "A valid token is missing!"}), 401)
        try:
            # decode the token to obtain user public_id
            #  data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = AuthManager.decode_token(token)
            print(user_id)
            current_user = UsersModel.query.filter_by(id=user_id).first()
        except:
            return make_response(jsonify({"message": "Invalid token!"}), 401)
        # Return the user information attached to the token
        return f(current_user, *args, **kwargs)

    return decorator


def permission_required(permission):
    def wrapper(fucn):
        def decorator(*args, **kwargs):
            token = None

            if "x-access-token" in request.headers:
                token = request.headers["x-access-token"]
                print(token)
            if not token:
                return make_response(
                    jsonify({"message": "A valid token is missing!"}), 401
                )

            try:

                user_id = AuthManager.decode_token(token)
                current_user = UsersModel.query.filter_by(id=user_id).first()
            except:
                return make_response(jsonify({"message": "Invalid token!"}), 401)

            if current_user.role != RoleType[permission]:
                raise Forbidden("You must be admin to have access to this resource")

            return fucn(*args, **kwargs)

        return decorator

    return wrapper
