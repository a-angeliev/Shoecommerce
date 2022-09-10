from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import InternalServerError, BadRequest, NotFound

from db import db
from models.brands import BrandModel
from utils.operations import db_add_items


class BrandManager:
    @staticmethod
    def create(brand_data):
        brand = BrandModel(**brand_data)
        db_add_items(brand)

        return brand

    # TODO
    # Delete and edit func

    @staticmethod
    def get_all():
        brands = BrandModel.query.all()
        return brands

    @staticmethod
    def get_by_name(brand_name):
        brand = BrandModel.query.filter_by(name=brand_name).first()
        if not brand:
            raise NotFound("There is not brand with that name")
        return brand

    @staticmethod
    def get_by_name_query(brand_name):
        brands = BrandModel.query.filter_by(name=brand_name)
        return brands
