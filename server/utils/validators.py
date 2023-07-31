from marshmallow import ValidationError
from password_strength import PasswordPolicy

from flask import request

from managers.auth import AuthManager
from models import UsersModel, RoleType

policy = PasswordPolicy.from_names(numbers=1)


def validate_password(value):
    errors = policy.test(value)
    if errors:
        raise ValidationError("Password must have atleast one number.")


def validate_if_admin():
    if "x-access-token" in request.headers:
        token = request.headers["x-access-token"]

        try:

            user_id = AuthManager.decode_token(token)
            current_user = UsersModel.query.filter_by(id=user_id).first()
        except:
            return False

        if current_user.role != RoleType["admin"]:
            return False
        return True
    else:
        return False
