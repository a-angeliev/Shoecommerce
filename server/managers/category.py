from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import BadRequest, InternalServerError, NotFound

from db import db
from models import CategoryModel, ProductsModel
from utils.operations import db_add_items


class CategoryManager:
    @staticmethod
    def create(category_data):
        new_category = CategoryModel(**category_data)
        db_add_items(new_category)

        return new_category

    # TODO
    # Add edit, delete, get products from category and get all categories

    @staticmethod
    def get_all():
        # categories_q = CategoryModel.query.join(CategoryModel.products).filter(ProductsModel.id > 91)
        categories_q = CategoryModel.query.all()
        return categories_q

    @staticmethod
    def get_by_name(category_title):
        category = CategoryModel.query.filter_by(title=category_title).first()
        if not category:
            raise NotFound("There is no category with that title")
        return category

    @staticmethod
    def get_by_title_query(category_title):
        category = CategoryModel.query.filter_by(title=category_title)
        return category
