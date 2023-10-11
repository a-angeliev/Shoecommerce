from werkzeug.exceptions import NotFound, BadRequest

from models import NewsletterModel
from utils.operations import db_add_items, db_delete_items


class NewsletterManager:
    @staticmethod
    def subscribe(data):
        row = NewsletterModel.query.filter_by(email=data["email"]).first()
        if row:
            raise BadRequest("You are already subscribed for our newsletter")
        new_row = NewsletterModel(email=data["email"], name=data["name"])
        db_add_items(new_row)
        return {"message": "You successfully subscribed for our newsletter."}

    @staticmethod
    def unsubscribe(data):
        row = NewsletterModel.query.filter_by(email=data["email"]).first()
        if not row:
            raise NotFound("You are not subscribed for our newsletter.")
        db_delete_items(row)
        return {"message": "You successfully unsubscribed for our newsletter."}
