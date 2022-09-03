from marshmallow import Schema, fields, validate, ValidationError, validates_schema


class CreateProductRequestSchema(Schema):
    title = fields.String(required=True, validate=validate.Length(max=255))
    description = fields.String(required=True)
    price = fields.Float(required=True, validate=validate.Range(min=0))
    discount = fields.Float(required=True, validate=validate.Range(min=0))
    gender = fields.Str(validate=validate.OneOf(["man", "kid", "woman"]))
    images = fields.List(fields.String())
    brand_name = fields.String(required=True)
    category_title = fields.String(required=True)
    
    @validates_schema
    def validate_numbers(self, data, **kwargs):
        if data["price"] < data["discount"]:
            raise ValidationError("price must be greater than discount")