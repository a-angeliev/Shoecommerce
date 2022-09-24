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
    user = fields.Nested(CommentUserNames())


class GetCommentInfoResponseSchema(CreateCommentResponseSchema):
    pass


class ProductInformationUserCommentResponseSchema(Schema):
    title = fields.String()
    price = fields.Float()


class GetUserCommentsResponseSchema(Schema):
    id = fields.Integer(required=True)
    comment = fields.String()
    rate = fields.Integer()
    user_id = fields.Integer(required=True)
    product_id = fields.Integer(required=True)
    product = fields.Nested(ProductInformationUserCommentResponseSchema())
