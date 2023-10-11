from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import InternalServerError, BadRequest, NotFound

from db import db
from models.brands import BrandModel
from utils.operations import db_add_items, db_delete_items


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
            raise NotFound("There is no brand with that name")
        return brand

    @staticmethod
    def get_by_id(_id):
        brand = BrandModel.query.filter_by(id=_id).first()
        if not brand:
            raise NotFound("There is no brand with that ID")
        return brand

    @staticmethod
    def get_by_name_query(brand_name):
        brands = BrandModel.query.filter_by(name=brand_name)
        return brands

    @staticmethod
    def edit_brand(_id, data):
        brand = BrandModel.query.filter_by(id=_id).first()
        if not brand:
            raise NotFound("This product does not exist.")

        brand.name = data["name"]
        brand.logo_url = data["logo_url"]
        brand.description = data["description"]

        db_add_items(brand)

        return brand

    @staticmethod
    def delete(_id):
        brand = BrandModel.query.filter_by(id=_id).first()
        if not brand:
            raise NotFound("There is no brand with that id")

        products = brand.products
        pairs = []
        images = []
        for product in products:
            for pair in product.pairs:
                pairs.append(pair)
            for img in product.images:
                images.append(img)
        print(pairs)
        db_delete_items([brand, *products, *pairs, *images])
        return {"massage": "You successfully deleted the brand"}
