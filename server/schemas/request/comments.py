from marshmallow import Schema, fields, validate

comment_rate = [0, 1, 2, 3, 4, 5]


class CreateCommentRequestSchema(Schema):
    product_id = fields.Integer(required=True)
    comment = fields.String()
    rate = fields.Integer(validate=validate.OneOf(comment_rate))


class EditCommentRequestSchema(CreateCommentRequestSchema):
    class Meta:
        exclude = ("product_id",)
