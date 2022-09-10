from marshmallow import Schema, fields


class ProductImagesBrandResponse(Schema):
    img_url = fields.String()


class ProductBrandResponseSchema(Schema):
    id = fields.Integer(required=True)
    title = fields.String(required=True)
    price = fields.Float(required=True)
    discount = fields.Float(required=True)
    images = fields.Nested(ProductImagesBrandResponse(), many=True)


class CreateBrandResponseSchema(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    description = fields.String(required=True)
    logo_url = fields.String(required=True)
    products = fields.Nested(ProductBrandResponseSchema(), many=True)


class BrandNameOnlyResponseSchema(CreateBrandResponseSchema):
    class Meta:
        exclude = ("products",)
