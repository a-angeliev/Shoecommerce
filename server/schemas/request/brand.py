from marshmallow import Schema, fields


class CreateBrandRequestSchema(Schema):
    name = fields.String(required=True)
    description = fields.String(required=True)
    logo_url = fields.String(required=True)

class EditBrandRequestSchema(CreateBrandRequestSchema):
    pass