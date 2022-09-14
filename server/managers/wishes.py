from werkzeug.exceptions import NotFound

from managers.products import ProductManager
from utils.operations import db_add_items


class WishesManager:
    @staticmethod
    def create_wish(user, product_data):
        product = ProductManager.get_one(product_data["id"])
        user.user_data.wishes.append(product)
        db_add_items(user)
        return {"id": product.id}

    @staticmethod
    def delete_wish(user, product_data):
        product = ProductManager.get_one(product_data["id"])
        if product in user.user_data.wishes:
            user.user_data.wishes.remove(product)
        else:
            raise NotFound("Product is not in wishlist")

        db_add_items(user)

        return {"id": product.id}

    @staticmethod
    def get_all(user):
        products = user.user_data.wishes
        return products
