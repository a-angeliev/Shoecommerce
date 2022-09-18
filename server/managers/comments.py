from werkzeug.exceptions import NotFound, Conflict, Forbidden

from managers.products import ProductManager
from models.comments import CommentsModel
from utils.operations import db_add_items


class CommentsManager:
    @staticmethod
    def create_comment(user, comment_data):
        ProductManager.get_one(comment_data["product_id"])
        data = {"user_id": user.user_data.id, "product_id": comment_data["product_id"]}
        if "comment" in comment_data.keys():
            data["comment"] = comment_data["comment"]
        if "rate" in comment_data.keys():
            data["rate"] = comment_data["rate"]

        if not CommentsModel.query.filter_by(
            user_id=user.user_data.id, product_id=comment_data["product_id"]
        ).first():
            comment = CommentsModel(**data)
            db_add_items(comment)
            return comment
        raise Conflict("You already have comment at this product")

    @staticmethod
    def get_comment(comment_id):
        comment = CommentsModel.query.filter_by(id=comment_id).first()
        if not comment:
            raise NotFound("There is not comment with that id.")
        return comment

    @staticmethod
    def edit_comment(user, comment_id, comment_data):
        comment_q = CommentsModel.query.filter_by(id=comment_id)
        comment = comment_q.first()
        if user.user_data is not comment.user:
            raise Forbidden("You can edit only your comments.")

        comment_q.update(comment_data)

        db_add_items(comment)
        return comment
