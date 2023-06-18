from sqlalchemy import func

from db import db
from models.enums import PairColor, IsShipped


class OrdersModel(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, server_default=func.now())
    total_price = db.Column(db.Float, nullable=False)
    final_price = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    order_items = db.relationship("OrderItemModel", backref="order", lazy="select")
    order_address = db.relationship("OrderAddressModel", backref="order", lazy="select")
    user_id = db.Column(db.Integer, db.ForeignKey("user_data.id"), nullable=False)
    is_shipped = db.Column(
        db.Enum(IsShipped, name="is_shipped", create_type=False),
        default=IsShipped.pending,
        nullable=False,
    )
    shipped_on = db.Column(db.DateTime, nullable=True)
    discount_code = db.Column(db.String, nullable=True)



class OrderItemModel(db.Model):
    __tablename__ = "order_item"
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    title = db.Column(db.Text, nullable=False)
    pair_size = db.Column(db.Integer, nullable=False)
    img = db.Column(db.Text, nullable=False)
    pair_color = db.Column(
        db.Enum(PairColor, name="pair_color", create_type=False), nullable=False
    )
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)


class OrderAddressModel(db.Model):
    __tablename__ = "order_address"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    address_1 = db.Column(db.Text, nullable=False)
    address_2 = db.Column(db.Text, nullable=True)
    post_code = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    email = db.Column(db.Text, nullable=False)
    phone = db.Column(db.Text, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
