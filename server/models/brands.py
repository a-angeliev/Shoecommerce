from db import db


class BrandModel(db.Model):
    __tablename__ = "brand"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    logo_url = db.Column(db.String(), nullable=False)
    products = db.relationship("ProductsModel", backref="brand", lazy="select")
