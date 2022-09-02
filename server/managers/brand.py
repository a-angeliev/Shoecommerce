from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import BadRequest, InternalServerError

from db import db
from models.brands import BrandModel


class BrandManager:
    @staticmethod
    def create(brand_data):
        brand = BrandModel(**brand_data)
        try:
            db.session.add(brand)
            db.session.flush()
            print(brand.products)
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Please login")
            else:
                InternalServerError("Server is unavailable.")
        return brand

    @staticmethod
    def get_all():
        brands = BrandModel.query.all()
        return brands

    @staticmethod
    def get_by_name(brand_name):
        brands = BrandModel.query.filter_by(name=brand_name).one()
        return brands
