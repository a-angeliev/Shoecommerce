from marshmallow import Schema, fields, validate

from schemas.bases_schemas import RegisterUserSchema
from utils.validators import validate_password


class RegisterUserRequestSchema(RegisterUserSchema):
    password = fields.String(
        required=True,
        validate=validate.And(validate.Length(min=5, max=60), validate_password),
    )
