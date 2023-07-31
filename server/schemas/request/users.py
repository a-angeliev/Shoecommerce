from marshmallow import Schema, fields, validate

from schemas.bases_schemas import (
    BaseUserSchema,
    BaseUserDataSchema,
    EditBaseUserDataSchema,
    BaseUserRegisterSchema,
)
from utils.validators import validate_password


class LoginUserRequestSchema(BaseUserSchema):
    pass


class RegisterUserDataRequestSchema(Schema):
    f_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    l_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    phone = fields.Integer(required=True)


class RegisterUserRequestSchema(BaseUserSchema):
    password = fields.String(
        required=True,
        validate=validate.And(validate.Length(min=5, max=60), validate_password),
    )
    user_data = fields.Nested(BaseUserRegisterSchema, required=True)


class EditUserRequestSchema(BaseUserSchema):
    user_data = fields.Nested(EditBaseUserDataSchema, required=True)

    class Meta:

        exclude = ("password",)
