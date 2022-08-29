from sqlalchemy import func, ForeignKey
from sqlalchemy.orm import relationship, declared_attr

from db import db
from models.enums import RoleType


class UsersModel(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum(RoleType), default=RoleType.user, nullable=False)
    user_data = db.relationship(
        "UserData", backref="users", uselist=False, lazy="select"
    )


class UserData(db.Model):
    __tablename__ = "user_data"

    id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(255), nullable=False)
    l_name = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    created_on = db.Column(db.DateTime, server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
