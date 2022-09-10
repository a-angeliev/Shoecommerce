from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import BadRequest, InternalServerError, NotFound

from db import db
from models import CategoryModel, ProductsModel


class CategoryManager:
    @staticmethod
    def create(category_data):
        new_category = CategoryModel(**category_data)
        try:
            db.session.add(new_category)
            db.session.flush()
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Category with this name already exist.")
            else:
                InternalServerError("Server is unavailable.")
        return new_category

    # TODO
    # Add edit, delete, get products from category and get all categories

    @staticmethod
    def get_all():
        # categories_q = CategoryModel.query.join(CategoryModel.products).filter(ProductsModel.id > 91)
        categories_q = ProductsModel.query.filter_by(id_deleted=True)
        print(categories_q)
        return categories_q.all()

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
