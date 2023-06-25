from marshmallow import Schema, fields, validate

from schemas.response.product import CreateProductResponseSchema



class ProductIdResponseSchema(Schema):
    id = fields.Integer(required=True)


class BaseUserRegisterSchema(Schema):
    f_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    l_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    phone = fields.Integer(required=True)

class BaseUserDataSchema(Schema):
    f_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    l_name = fields.String(required=True, validate=validate.Length(min=2, max=60))
    phone = fields.Integer(required=True)
    wishes = fields.Nested(ProductIdResponseSchema(), many=True)
    created_on = fields.String(required=True)

    class Meta:
        include_relationships = True
        load_instance = True
        include_fk = True

class EditBaseUserDataSchema(BaseUserDataSchema):
    class Meta:
        exclude = ("created_on",)


class BaseUserSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(
        required=True,
    )
