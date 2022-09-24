from db import db


class DiscountsModel(db.Model):
    __tablename__ = "discounts"

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(255), nullable=False)
    discount = db.Column(db.Integer, nullable=False)
    started_on = db.Column(db.DateTime, nullable=False)
    ended_on = db.Column(db.DateTime, nullable=False)
