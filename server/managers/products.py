from flask import request

from werkzeug.exceptions import NotFound

from db import db
from managers.brand import BrandManager
from managers.category import CategoryManager
from models import BrandModel, CategoryModel
from models.enums import GenderType, RoleType
from models.products import ProductsModel, ProductImages, ProductPair
from schemas.request.product import CreateProductRequestSchema
from utils.decorators import validate_schema
from sqlalchemy.sql.expression import false, true, text

from sqlalchemy.sql import column
from sqlalchemy.sql.expression import BinaryExpression
from sqlalchemy.sql import operators


class ProductManager:
    @staticmethod
    def create_product(product_data):
        images = []
        for image in product_data["images"]:
            img = ProductImages(img_url=image)
            images.append(img)

        product_pair = []
        for obj in product_data["pairs"]:
            pair = ProductPair(**obj)
            product_pair.append(pair)

        print(product_data["pairs"])
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
    def get_one(id_):
        product = ProductsModel.query.filter(
            ProductsModel.id == id_, text("is_deleted is FALSE")
        ).first()
        if not product:
            raise NotFound("This product does not exist.")
        return product

    @staticmethod
    def get_all():
        category_title = request.args.get("category")
        brand_name = request.args.get("brand")
        gender = request.args.get("gender")

        category_f = CategoryModel.title == category_title
        brand_f = BrandModel.name == brand_name
        gender_f = ProductsModel.gender == gender

        if not category_title:
            category_f = True
        if not brand_name:
            brand_f = True
        if not gender:
            gender_f = True

        print(ProductsModel.is_deleted)

        products = (
            ProductsModel.query.join(ProductsModel.category)
            .join(ProductsModel.brand)
            .filter(brand_f, text("is_deleted is FALSE"), category_f, gender_f)
        )

        return products.all()

    @staticmethod
    def delete_product(id_):
        product = ProductsModel.query.filter(
            ProductsModel.id == id_, text("is_deleted is FALSE")
        ).first()

        if not product:
            raise NotFound("This product does not exist.")
        try:
            print(product.is_deleted)
            product.is_deleted = True
            db.session.flush()
        except:
            print("err")

        return "Product is deleted", 204
