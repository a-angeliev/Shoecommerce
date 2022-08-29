from marshmallow import Schema, fields

from schemas.bases_schemas import RegisterUserSchema


class RegisterResponseUser(RegisterUserSchema):
    id = fields.Integer(required=True)
