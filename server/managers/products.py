from db import db
from models.enums import GenderType
from models.products import ProductsModel, ProductImages


class ProductManager:
    @staticmethod
    def create_product():
        p = ProductsModel(
            title="sadsd",
            description="asdsd",
            price=10.0,
            discount=5.0,
            gender=GenderType["man"],
        )
        img1 = ProductImages(img_url="https://someurl1.com")
        img2 = ProductImages(img_url="https://someurl2.com")

        p.images = [img2, img1]
        db.session.add(p)
        db.session.add(img1)
        db.session.add(img2)

        db.session.commit()
        return None

    @staticmethod
    def get_one():
        p = ProductsModel.query.filter_by(id=1).one()
        for x in p.images:
            print(x.img_url)
        print(p.images)
        return None
