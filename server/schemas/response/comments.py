from marshmallow import Schema, fields


class CreateCommentResponseSchema(Schema):
    id = fields.Integer(required=True)
    comment = fields.String()
    rate = fields.Integer()
    user_id = fields.Integer(required=True)
    product_id = fields.Integer(required=True)