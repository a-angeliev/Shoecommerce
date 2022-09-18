
from werkzeug.exceptions import NotFound, Conflict

from managers.products import ProductManager
from models.comments import CommentsModel
from utils.operations import db_add_items


class CommentsManager:


    @staticmethod
    def create_comment(user, comment_data):
        ProductManager.get_one(comment_data['product_id'])
        data = {"user_id": user.user_data.id, "product_id": comment_data['product_id']}
        if "comment" in comment_data.keys():
            data['comment'] = comment_data['comment']
        if "rate" in comment_data.keys():
            data['rate'] = comment_data['rate']

        if not CommentsModel.query.filter_by(user_id=user.user_data.id, product_id=comment_data['product_id']).first():
            comment = CommentsModel(**data)
            db_add_items(comment)
            return comment
        raise Conflict("You already have comment at this product")


