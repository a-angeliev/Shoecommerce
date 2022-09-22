from marshmallow import Schema, fields


class CreateOrderInfoRequestSchema(Schema):
    product_id = fields.Integer(required=True)
    pair_id = fields.Integer(required=True)


class CreateOrderRequestSchema(Schema):
    comment = fields.String(required=True)
    order_items = fields.List(fields.Nested(CreateOrderInfoRequestSchema()), many=True)
