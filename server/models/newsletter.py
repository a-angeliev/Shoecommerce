from db import db


class NewsletterModel(db.Model):
    __tablename__ = "newsletter"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)