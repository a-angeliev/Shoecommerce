from marshmallow import Schema, fields


class CreateDiscountsResponseSchema(Schema):
    id = fields.Integer(required=True)
    code = fields.String(required=True)
    discount = fields.Integer(required=True)
    started_on = fields.DateTime(required=True)
    ended_on = fields.DateTime(required=True)


class DiscountCreateResponseSchema(CreateDiscountsResponseSchema):
    pass


class GetAllDiscountsResponseSchema(CreateDiscountsResponseSchema):
    pass
