from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import InternalServerError, BadRequest

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
                raise BadRequest("Brand with this name already exist.")
            else:
                InternalServerError("Server is unavailable.")
        return brand

    #TODO
    #Delete and edit func

    @staticmethod
    def get_all():
        brands = BrandModel.query.all()
        return brands

    @staticmethod
    def get_by_name(brand_name):
        brands = BrandModel.query.filter_by(name=brand_name).one()
        return brands
