from marshmallow import Schema, fields


class CreateCategoryResponseSchema(Schema):
    id = fields.Integer(required=True)
    title = fields.String(required=True)
