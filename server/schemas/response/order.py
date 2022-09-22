from marshmallow import Schema, fields


class CreateOrderItemsResponseSchema(Schema):
    id = fields.Integer(required=True)
    price = fields.Float(required=True)
    title = fields.String(required=True)
    pair_size = fields.Integer(required=True)
    pair_color = fields.String(required=True)
    product_id = fields.Integer(required=True)


class CreateOrderResponseSchema(Schema):
    id = fields.Integer(required=True)
    created_on = fields.DateTime(required=True)
    total_price = fields.Float(required=True)
    comment = fields.String(required=True)
    user_id = fields.Integer(required=True)
    order_items = fields.Nested(CreateOrderItemsResponseSchema(), many=True)
    is_shipped = fields.String(required=True)
    shipped_on = fields.DateTime(required=True)