from marshmallow import Schema, fields, validate

from models.enums import IsShipped

status = IsShipped.list()


class CreateOrderInfoRequestSchema(Schema):
    product_id = fields.Integer(required=True)
    pair_id = fields.Integer(required=True)


class CreateOrderAddressRequestSchema(Schema):
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    address_1 = fields.String(required=True)
    address_2 = fields.String(required=False)
    post_code = fields.Integer(required=True)
    city = fields.String(required=True)
    country = fields.String(required=True)
    email = fields.Email(required=True)
    phone = fields.Integer(required=True)


class CreateOrderRequestSchema(Schema):
    comment = fields.String(required=True)
    order_items = fields.List(
        fields.Nested(CreateOrderInfoRequestSchema()), many=True, required=True
    )
    address = fields.Nested(CreateOrderAddressRequestSchema(), required=True)
    discount_code = fields.String(required=True)


class ChangeOrderStatusRequestSchema(Schema):
    status = fields.String(validate=validate.OneOf(status))
