from marshmallow import Schema, fields


class ProductImagesCategoryResponse(Schema):
    img_url = fields.String()


class ProductCategoryResponseSchema(Schema):
    id = fields.Integer(required=True)
    title = fields.String(required=True)
    price = fields.Float(required=True)
    discount = fields.Float(required=True)
    images = fields.Nested(ProductImagesCategoryResponse(), many=True)
    is_deleted = fields.Boolean()


class CreateCategoryResponseSchema(Schema):
    id = fields.Integer(required=True)
    title = fields.String(required=True)
    products = fields.Nested(ProductCategoryResponseSchema(), many=True)
