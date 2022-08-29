from marshmallow import Schema, fields, validate


class RegisterUserDataSchema(Schema):
    f_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    l_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    phone = fields.Integer(required=True)


class RegisterUserSchema(Schema):
    email = fields.Email(required=True)
    user_data = fields.Nested(RegisterUserDataSchema, required=True)
