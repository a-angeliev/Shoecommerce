from marshmallow import Schema, fields


class CreateCategoryRequestSchema(Schema):
    title = fields.String(required=True)
