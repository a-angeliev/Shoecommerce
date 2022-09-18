from flask import request
from flask_restful import Resource

from managers.comments import CommentsManager
from schemas.request.comments import CreateCommentRequestSchema
from schemas.response.comments import CreateCommentResponseSchema
from utils.decorators import token_required, validate_schema


class Comments(Resource):

    @staticmethod
    @token_required
    @validate_schema(CreateCommentRequestSchema)
    def post(user):
        comment = CommentsManager.create_comment(user, request.get_json())
        schema = CreateCommentResponseSchema()
        return schema.dumps(comment)