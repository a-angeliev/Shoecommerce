from flask import request

from werkzeug.exceptions import NotFound, BadRequest, Conflict

from db import db
from managers.brand import BrandManager
from managers.category import CategoryManager
from models import BrandModel, CategoryModel
from models.enums import GenderType
from models.products import ProductsModel, ProductImages, ProductPair

from sqlalchemy.sql.expression import text

from utils.operations import db_add_items, db_delete_items


def check_pair_or_image_product(item, product, item_id, product_id, item_name="item"):

    if not item:
        raise NotFound(f"There is not {item_name} with id: {item_id}")

    if not product:
        raise NotFound(f"There is not product with id: {product_id}")

    if item not in product.pairs and item not in product.images:
        raise BadRequest(
            f"{item_name} with id: {item_id} is not attached to product with id: {product_id}"
        )


class ProductManager:
    @staticmethod
    def create_product(product_data):
        images = []
        for image in product_data["images"]:
            img = ProductImages(img_url=image)
            images.append(img)

        product_pair = []
        for obj in product_data["pairs"]:
            for p in product_pair:
                if p.size == obj["size"] and p.color == obj["color"]:
                    raise Conflict(
                        f"Pair with color: {obj['color']} and {obj['size']} already attached to product with id: {id}"
                    )
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

        db_add_items(product, category, brand)

        return product

    @staticmethod
    def add_image(id, image_data):
        image = ProductImages(img_url=image_data["img_url"], product_id=id)

        db_add_items(image)
        return image

    @staticmethod
    def delete_image(id, image_id):

        image = ProductImages.query.filter_by(id=image_id["id"]).first()
        product = ProductsModel.query.filter(
            ProductsModel.id == id, text("is_deleted is FALSE")
        ).first()

        check_pair_or_image_product(image, product, image_id["id"], id, "images")
        db_delete_items(*image)

        return f"You deleted image with id: {image_id['id']} successfully", 202

    @staticmethod
    def edit_image(product_id, images_data):
        images_ids = [id for id in images_data["ids"]]
        new_urls = [url for url in images_data["urls"]]
        product = ProductsModel.query.filter_by(id=product_id).first()

        new_images = [
            ProductImages(product_id=product_id, img_url=url) for url in new_urls
        ]
        old_images = [ProductImages.query.filter_by(id=id).first() for id in images_ids]

        if len(images_ids) != len(new_urls):
            raise BadRequest(
                "You should add the same number of new images as the number of deleted ones."
            )

        if not product:
            raise NotFound(f"There is not product with id: {product_id}")

        for image in old_images:
            if image not in product.images:
                raise NotFound(
                    f"The id:{id} is not attached to product with id:{product_id}"
                )

        try:
            db_add_items(*new_images)
            db_delete_items(old_images)
        except:
            raise BadRequest("You cannot do that operation")

        return {"message": "You successfully edited the images"}

    @staticmethod
    def add_pair(id, pair_data):
        product = ProductsModel.query.filter(
            ProductsModel.id == id, text("is_deleted is FALSE")
        ).first()
        is_pair = ProductPair.query.filter_by(
            size=pair_data["size"], color=pair_data["color"], product_id=id
        ).first()
        if is_pair:
            raise Conflict(
                f"Pair with color: {pair_data['color']} and {pair_data['size']} is already attached to product with id: {id}"
            )
        if not product:
            raise NotFound("There is no product with that id")
        pair = ProductPair(**pair_data, product_id=id)
        db_add_items(pair)
        return pair

    @staticmethod
    def delete_pair(id, pair_id):
        product = ProductsModel.query.filter(
            ProductsModel.id == id, text("is_deleted is FALSE")
        ).first()
        pair = ProductPair.query.filter_by(id=pair_id["id"]).first()

        check_pair_or_image_product(pair, product, pair_id["id"], id, "pair")

        db_delete_items(pair)

        return f"You deleted image with id: {pair_id['id']} successfully", 202

    @staticmethod
    def edit_pair(product_id, pair_id, pair_data):
        product = ProductsModel.query.filter_by(id=product_id).first()
        pair = ProductPair.query.filter_by(id=pair_id).first()

        check_pair_or_image_product(pair, product, pair_id, product_id, "pair")

        # pair.size = pair_data["size"]
        # pair.color = pair_data["color"]
        pair.quantity = pair_data["quantity"]

        db_add_items(pair)

        return pair

    @staticmethod
    def sell_pair(pairs):
        for pair in pairs:
            pair.quantity -= 1

        return pairs

    @staticmethod
    def edit_product_base_info(id_, product_data):
        # product_q = ProductsModel.query.filter(
        #     ProductsModel.id == id_, text("is_deleted is FALSE")
        # )

        product_q = ProductsModel.query.filter_by(id=id_)
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

        db_add_items(product, new_category, old_category, new_brand, old_brand)

        return product

    @staticmethod
    def get_one(id_, for_admin=False):
        if for_admin:
            product = ProductsModel.query.filter_by(id=id_).first()
        else:
            product = ProductsModel.query.filter(
                ProductsModel.id == id_, text("is_deleted is FALSE")
            ).first()
        if not product:
            raise NotFound("This product does not exist.")
        return product

    @staticmethod
    def get_all(for_admin=False):

        category_title = request.args.get("category")
        brand_name = request.args.get("brand")
        gender = request.args.get("gender")

        category_f = CategoryModel.title == category_title
        brand_f = BrandModel.name == brand_name
        if gender not in GenderType.list() and gender:
            raise NotFound("There is not gender with that name")
        gender_f = ProductsModel.gender == gender

        if not category_title:
            category_f = True
        if not brand_name:
            brand_f = True
        if not gender:
            gender_f = True

        if for_admin:
            products = (
                ProductsModel.query.join(ProductsModel.category)
                .join(ProductsModel.brand)
                .filter(brand_f, category_f, gender_f)
            )
        else:
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
        product.is_deleted = True
        db_add_items()

        return "The product is deleted", 202
