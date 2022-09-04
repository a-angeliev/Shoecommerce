from marshmallow import Schema, fields


class ImagesSchemaNested(Schema):
    id = fields.Integer(required=True)
    img_url = fields.String(required=True)


class BrandSchemaNested(Schema):
    # id = fields.Integer(required=True)
    name = fields.String(required=True)
    logo_url = fields.String(required=True)


class CategorySchemaNested(Schema):
    # id = fields.Integer(required=True)
    title = fields.String(required=True)


class ProductPairResponseSchema(Schema):
    id = fields.Integer(required=True)
    size = fields.Integer(required=True)
    color = fields.String(required=True)
    quantity = fields.Integer(required=True)


class CreateProductResponseSchema(Schema):
    id = fields.Integer(required=True)
    title = fields.String(required=True)
    description = fields.String(required=True)
    price = fields.Float(required=True)
    discount = fields.Float(required=True)
    gender = fields.String(required=True)
    images = fields.Nested(ImagesSchemaNested(), many=True)
    pairs = fields.Nested(ProductPairResponseSchema(), required=True, many=True)
    brand = fields.Nested(BrandSchemaNested(), required=True)
    category = fields.Nested(CategorySchemaNested(), required=True)
