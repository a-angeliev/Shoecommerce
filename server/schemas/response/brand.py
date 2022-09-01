from marshmallow import Schema, fields


class CreateBrandResponseSchema(Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    description = fields.String(required=True)
    logo_url = fields.String(required=True)
