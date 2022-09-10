from psycopg2.errorcodes import UNIQUE_VIOLATION
from werkzeug.exceptions import BadRequest, InternalServerError

from db import db


def db_add_items(*items):
    try:
        if items:
            db.session.add_all(items)
        db.session.flush()
    except Exception as ex:
        if ex.orig.pgcode == UNIQUE_VIOLATION:
            raise BadRequest("Item that you try to add already exist")
        else:
            InternalServerError("Server is unavailable.")
