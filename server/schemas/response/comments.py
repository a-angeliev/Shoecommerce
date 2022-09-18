from marshmallow import Schema, fields


class CommentUserNames(Schema):
    f_name = fields.String()
    l_name = fields.String()


class CreateCommentResponseSchema(Schema):
    id = fields.Integer(required=True)
    comment = fields.String()
    rate = fields.Integer()
    user_id = fields.Integer(required=True)
    product_id = fields.Integer(required=True)


class GetCommentInfoResponseSchema(CreateCommentResponseSchema):
    user = fields.Nested(CommentUserNames())
