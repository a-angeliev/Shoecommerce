from flask import request
from psycopg2.errorcodes import UNIQUE_VIOLATION

from werkzeug.exceptions import NotFound, BadRequest, InternalServerError

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
        if not brand:
            raise NotFound("There is no brand with that name")
        if not category:
            raise NotFound("There is no category with that name")

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
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Please login")
            else:
                InternalServerError("Server is unavailable.")

        return product

    @staticmethod
    def add_image(id, image_data):
        image = ProductImages(img_url=image_data["img_url"], product_id=id)
        try:
            db.session.add(image)
            db.session.flush()
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Please login")
            else:
                InternalServerError("Server is unavailable.")
        return image

    @staticmethod
    def delete_image(id, image_id):
        image = ProductImages.query.filter_by(id=image_id["id"]).first()
        product = ProductsModel.query.filter(
            ProductsModel.id == id, text("is_deleted is FALSE")
        ).first()
        if not image:
            raise NotFound("There is not image with that id")

        if image not in product.images:
            raise BadRequest(
                f"Image with id: {image_id['id']} is not attached to product with id: {id}"
            )

        try:
            db.session.delete(image)
            db.session.flush()
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Please login")
            else:
                InternalServerError("Server is unavailable.")

        return f"You delete image with id: {image_id['id']} successfully", 202

    @staticmethod
    def add_pair(id, pair_data):
        product = ProductsModel.query.filter(ProductsModel.id == id, text("is_deleted is FALSE")).first()
        if not product:
            raise NotFound("There is no product with that id")
        pair = ProductPair(**pair_data, product_id=id)
        try:
            db.session.add(pair)
            db.session.flush()
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Please login")
            else:
                InternalServerError("Server is unavailable.")
        return pair


    @staticmethod
    def edit_product_base_info(id_, product_data):
        product_q = ProductsModel.query.filter(
            ProductsModel.id == id_, text("is_deleted is FALSE")
        )
        product = product_q.first()

        if not product:
            raise NotFound("This product does not exist.")
        product_q = ProductsModel.query.filter(ProductsModel.id == id_)

        old_brand = product.brand
        old_category = product.category
        new_brand = BrandManager.get_by_name(product_data["brand_name"])
        new_category = CategoryManager.get_by_name(product_data["category_title"])
        if not new_brand:
            raise NotFound("There is no brand with that name")
        if not new_category:
            raise NotFound("There is no category with that name")

        product_data.pop("brand_name")
        product_data.pop("category_title")
        with db.session.no_autoflush:
            print(product_data)
            product_q.update(product_data)
            if not old_brand.name == new_brand.name:
                old_brand.products.remove(product)
                new_brand.products.append(product)
            if not old_category.title == new_category.title:
                old_category.products.remove(product)
                new_category.products.append(product)

        try:

            db.session.add_all(
                [product, new_category, old_category, new_brand, old_brand]
            )
            db.session.flush()
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Please login")
            else:
                InternalServerError("Server is unavailable.")

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
            product.is_deleted = True
            db.session.flush()
        except Exception as ex:
            if ex.orig.pgcode == UNIQUE_VIOLATION:
                raise BadRequest("Please login")
            else:
                InternalServerError("Server is unavailable.")

        return "Product is deleted", 202
