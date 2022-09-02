from flask import request
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from managers.brand import BrandManager
from models.products import *
from schemas.request.brand import CreateBrandRequestSchema
from schemas.response.brand import CreateBrandResponseSchema
from utils.decorators import validate_schema


class Brand(Resource):
    @validate_schema(CreateBrandRequestSchema)
    def post(self):
        brand = BrandManager.create(request.get_json())
        schema = CreateBrandResponseSchema()
        return schema.dumps(brand)

    def get(self):
        brand = request.args.get('brand')
        if brand:
            try:
                brands = BrandModel.query.filter_by(name=brand).one()
                schema = CreateBrandResponseSchema()
                return schema.dumps(brands)
            except:
                raise BadRequest("Th    ere is no brand with that name")
        raise BadRequest("You should use query parameters, check the documentation!")