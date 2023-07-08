from marshmallow import Schema, fields, validate, ValidationError, validates_schema

from models import PairColor, GenderType

color_list = PairColor.list()
gender_list = GenderType.list()


class CreatePorductPairRequestSchema(Schema):
    size = fields.Integer(required=True)
    color = fields.Str(validate=validate.OneOf(color_list))
    quantity = fields.Integer(required=True, validate=validate.Range(min=0))


class CreateProductRequestSchema(Schema):
    title = fields.String(required=True, validate=validate.Length(max=255))
    description = fields.String(required=True)
    price = fields.Float(required=True, validate=validate.Range(min=0))
    discount = fields.Float(required=True, validate=validate.Range(min=0))
    gender = fields.Str(validate=validate.OneOf(gender_list))
    images = fields.List(fields.String())
    brand_name = fields.String(required=True)
    category_title = fields.String(required=True)
    pairs = fields.List(fields.Nested(CreatePorductPairRequestSchema(), required=True))
    is_deleted = fields.Boolean(required=False)

    @validates_schema
    def validate_numbers(self, data, **kwargs):
        if data["price"] < data["discount"]:
            raise ValidationError("price must be greater than discount")


class EditProductBaseInformationRequestSchema(CreateProductRequestSchema):
    class Meta:
        exclude = ("images", "pairs")


class CreateProductImageRequestSchema(Schema):
    img_url = fields.String(required=True)


class DeleteProductImageRequestSchema(Schema):
    id = fields.Integer(required=True)


class DeleteProductPairRequestSchema(Schema):
    id = fields.Integer(required=True)
