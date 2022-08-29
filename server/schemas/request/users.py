from marshmallow import Schema, fields, validate

from utils.validators import validate_password


class LoginUserRequestSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(
        required=True,
    )


class RegisterUserDataRequestSchema(Schema):
    f_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    l_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    phone = fields.Integer(required=True)


class RegisterUserRequestSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(
        required=True,
        validate=validate.And(validate.Length(min=5, max=60), validate_password),
    )
    user_data = fields.Nested(RegisterUserDataRequestSchema, required=True)
