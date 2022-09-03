from flask_restful import Resource

from managers.products import ProductManager


class Products(Resource):
    @staticmethod
    def get():
        # ProductManager.create_product()
        ProductManager.get_one()
        return 200
