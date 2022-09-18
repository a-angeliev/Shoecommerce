from db import db


class CommentsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=True)
    rate = db.Column(db.Integer, nullable=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_data.id"), nullable=False)
