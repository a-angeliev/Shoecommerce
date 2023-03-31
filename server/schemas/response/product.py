from marshmallow import Schema, fields

from schemas.utils_schemas import CustomEnumField


class ImagesSchemaNested(Schema):
    id = fields.Integer(required=True)
    img_url = fields.String(required=True)


class BrandSchemaNested(Schema):
    # id = fields.Integer(required=True)
    name = fields.String(required=True)
    logo_url = fields.String(required=True)
    description = fields.String(required=True)


class CategorySchemaNested(Schema):
    # id = fields.Integer(required=True)
    title = fields.String(required=True)


class ProductPairResponseSchema(Schema):
    id = fields.Integer(required=True)
    size = CustomEnumField(required=True)
    color = CustomEnumField(required=True)
    quantity = fields.Integer(required=True)


class CreateProductResponseSchema(Schema):
    id = fields.Integer(required=True)
    title = fields.String(required=True)
    description = fields.String(required=True)
    price = fields.Float(required=True)
    discount = fields.Float(required=True)
    gender = CustomEnumField(required=True)
    images = fields.Nested(ImagesSchemaNested(), many=True)
    pairs = fields.Nested(ProductPairResponseSchema(), required=True, many=True)
    brand = fields.Nested(BrandSchemaNested(), required=True)
    category = fields.Nested(CategorySchemaNested(), required=True)
    is_deleted = fields.Boolean()


class AddImageProductResponseSchema(Schema):
    id = fields.Integer(required=True)
    img_url = fields.String(required=True)
    product_id = fields.Integer(required=True)


class AddProductPairResponseSchema(Schema):
    id = fields.Integer(required=True)
    size = CustomEnumField(required=True)
    color = CustomEnumField(required=True)
    quantity = fields.Integer(required=True)
    product_id = fields.Integer(required=True)


class EditProductPairResponseSchema(AddProductPairResponseSchema):
    pass
