from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import BadRequest, InternalServerError

from db import db
from models import CategoryModel


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
