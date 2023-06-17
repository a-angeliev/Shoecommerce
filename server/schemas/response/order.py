from marshmallow import Schema, fields, validate

from schemas.utils_schemas import CustomEnumField


class CreateOrderItemsResponseSchema(Schema):
    id = fields.Integer(required=True)
    price = fields.Float(required=True)
    title = fields.String(required=True)
    pair_size = fields.Integer(required=True)
    pair_color = fields.String(required=True)
    product_id = fields.Integer(required=True)


class CreateOrderAddressResponseSchema(Schema):
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    address_1 = fields.String(required=True)
    address_2 = fields.String(required=False)
    post_code = fields.Integer(required=True)
    city = fields.String(required=True)
    country = fields.String(required=True)
    email = fields.Email(required=True)
    phone = fields.Integer(required=True)


class CreateOrderResponseSchema(Schema):
    id = fields.Integer(required=True)
    created_on = fields.DateTime(required=True)
    total_price = fields.Float(required=True)
    comment = fields.String(required=True)
    user_id = fields.Integer(required=True)
    order_items = fields.Nested(CreateOrderItemsResponseSchema(), many=True)
    is_shipped = CustomEnumField(required=True)
    shipped_on = fields.DateTime(required=True)
    final_price = fields.Float(required=True)
    order_address = fields.Nested(CreateOrderAddressResponseSchema(), many=True)


class GetAllOrdersResponseSchema(CreateOrderResponseSchema):
    pass


class GetUserOrdersResponseSchema(CreateOrderResponseSchema):
    pass
