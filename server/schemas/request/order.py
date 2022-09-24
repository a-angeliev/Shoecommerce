from marshmallow import Schema, fields, validate

from models.enums import IsShipped

status = IsShipped.list()


class CreateOrderInfoRequestSchema(Schema):
    product_id = fields.Integer(required=True)
    pair_id = fields.Integer(required=True)


class CreateOrderRequestSchema(Schema):
    comment = fields.String(required=True)
    order_items = fields.List(fields.Nested(CreateOrderInfoRequestSchema()), many=True)


class ChangeOrderStatusRequestSchema(Schema):
    status = fields.String(validate=validate.OneOf(status))
