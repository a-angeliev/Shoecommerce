from db import db
from models.category import CategoryModel
from models.enums import GenderType, PairColor
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
    pairs = db.relationship("ProductPair", backref="product", lazy="select")
    brand_id = db.Column(db.Integer, db.ForeignKey(BrandModel.id), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(CategoryModel.id), nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)


class ProductImages(db.Model):
    __tablename__ = "product_images"
    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(512), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)


class ProductPair(db.Model):
    __tablename__ = "product_pair"
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.Integer, nullable=False)
    color = db.Column(db.Enum(PairColor), nullable=False)
    quantity = db.Column(db.Integer, default=0)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
