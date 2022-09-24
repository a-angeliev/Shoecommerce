from marshmallow import Schema, fields


class CreateDiscountRequestSchema(Schema):
    code = fields.String(required=True)
    discount = fields.Integer(required=True)
    started_on = fields.String(required=True)
    ended_on = fields.String(required=True)


class CheckIsDiscountIsValidRequestSchema(Schema):
    code = fields.String(required=True)
