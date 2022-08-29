from flask import request
from werkzeug.exceptions import BadRequest, Forbidden, Unauthorized


def validate_schema(schema_name):
    def wrapper(func):
        def decorated_func(*args, **kwargs):
            data = request.get_json()
            schema = schema_name()
            errors = schema.validate(data)
            if errors:
                raise Unauthorized(errors)
            return func(*args, **kwargs)

        return decorated_func

    return wrapper
