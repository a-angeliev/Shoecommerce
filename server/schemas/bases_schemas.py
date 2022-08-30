from marshmallow import Schema, fields, validate


class BaseUserDataSchema(Schema):
    f_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    l_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    phone = fields.Integer(required=True)


class BaseUserSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(
        required=True,
    )
