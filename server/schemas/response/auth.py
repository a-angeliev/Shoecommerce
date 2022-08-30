from marshmallow import Schema, fields, validate

from schemas.bases_schemas import BaseUserSchema, BaseUserDataSchema
from utils.validators import validate_password


class UserResponseSchema(BaseUserSchema):
    id = fields.Integer(required=True)
    user_data = fields.Nested(BaseUserDataSchema, required=True)

    class Meta:
        exclude = ("password",)
