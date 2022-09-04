from flask import request

from db import db
from managers.brand import BrandManager
from managers.category import CategoryManager
from models import BrandModel, CategoryModel
from models.enums import GenderType, RoleType
from models.products import ProductsModel, ProductImages, ProductPair
from schemas.request.product import CreateProductRequestSchema
from utils.decorators import validate_schema


class ProductManager:
    @staticmethod
    def create_product(product_data):
        images = []
        for image in product_data["images"]:
            img = ProductImages(img_url=image)
            images.append(img)

        product_pair = []
        for obj in product_data['product_pair']:
            pair = ProductPair(**obj)
            product_pair.append(pair)

        print(product_data['product_pair'])
        brand_q = BrandManager.get_by_name_query(product_data["brand_name"])
        category_q = CategoryManager.get_by_title_query(product_data["category_title"])
        brand = brand_q.first()
        category = category_q.first()
        with db.session.no_autoflush:

            product = ProductsModel(
                title=product_data["title"],
                description=product_data["description"],
                price=product_data["price"],
                discount=product_data["discount"],
                gender=GenderType[product_data["gender"]],
            )
            brand.products.append(product)
            category.products.append(product)

            for img in images:
                product.images.append(img)

            for pair in product_pair:
                product.pairs.append(pair)

        try:

            db.session.add_all([product, category, brand])
            db.session.flush()
        except:
            print("error")

        return product

    @staticmethod
    def get_one():
        p = ProductsModel.query.filter_by(id=1).one()
        for x in p.images:
            print(x.img_url)
        print(p.images)
        return None
