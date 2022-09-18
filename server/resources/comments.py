import json

from flask import request
from flask_restful import Resource

from managers.comments import CommentsManager
from schemas.request.comments import (
    CreateCommentRequestSchema,
    EditCommentRequestSchema,
)
from schemas.response.comments import (
    CreateCommentResponseSchema,
    GetCommentInfoResponseSchema,
)
from utils.decorators import token_required, validate_schema


class Comments(Resource):
    @staticmethod
    @token_required
    @validate_schema(CreateCommentRequestSchema)
    def post(user):
        comment = CommentsManager.create_comment(user, request.get_json())
        schema = CreateCommentResponseSchema()
        return schema.dumps(comment)


class CommentAction(Resource):
    @staticmethod
    def get(id_):
        comment = CommentsManager.get_comment(id_)
        schema = GetCommentInfoResponseSchema()
        return schema.dumps(comment)

    @staticmethod
    @token_required
    @validate_schema(EditCommentRequestSchema)
    def put(user, id_):
        comment = CommentsManager.edit_comment(user, id_, request.get_json())
        schema = GetCommentInfoResponseSchema()
        return schema.dumps(comment)

    @staticmethod
    @token_required
    def delete(user, id_):
        response = CommentsManager.delete_comment(user, id_)
        return json.dumps({"message": response})
