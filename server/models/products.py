from db import db
from models.enums import GenderType
from models.brands import BrandModel

class ProductsModel(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    discount = db.Column(db.Float, nullable=False)
    gender = db.Column(db.Enum(GenderType), nullable=False)
    images = db.relationship("ProductImages", backref="product", lazy="select")
    brand_id = db.Column(db.Integer, db.ForeignKey(BrandModel.id), nullable=False)


class ProductImages(db.Model):
    __tablename__ = "product_images"
    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(512), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
