from datetime import datetime

from werkzeug.exceptions import NotFound

from models.discounts import DiscountsModel
from utils.operations import db_add_items, db_delete_items


class DiscountsManager:
    @staticmethod
    def create(discount_data):
        discount = DiscountsModel(**discount_data)
        db_add_items(discount)
        return discount

    @staticmethod
    def delete(id_):
        discount = DiscountsModel.query.filter_by(id=id_).first()
        if not discount:
            raise NotFound("This discount does not exist.")

        db_delete_items(discount)
        return {"massage": "You successfully delete the discount"}

    @staticmethod
    def is_valid(discount_data):
        discount = DiscountsModel.query.filter_by(code=discount_data["code"]).first()
        if discount:
            if (
                datetime.utcnow() > discount.started_on
                and datetime.utcnow() < discount.ended_on
            ):
                return {"is_valid": True, "discount": discount.discount}
        return {"is_valid": False}

    @staticmethod
    def get_all():
        return DiscountsModel.query.all()
