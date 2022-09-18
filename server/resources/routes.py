from resources.auth import Login
from resources.brand import Brand
from resources.category import Category
from resources.comments import Comments, CommentAction
from resources.products import (
    Products,
    Product,
    ProductImages,
    ProductPairs,
    ProductPairEdit,
)
from resources.users import Register, User, UserComments
from resources.wishes import Wishes

routes = (
    (Register, "/register"),
    (Login, "/login"),
    (User, "/user/<int:id_>"),
    (UserComments, "/user/<int:id_>/comments"),
    (Products, "/products"),
    (Product, "/products/product/<int:id_>"),
    (ProductImages, "/products/product/<int:id_>/images"),
    (ProductPairs, "/products/product/<int:id_>/pairs"),
    (ProductPairEdit, "/products/product/<int:id_>/pairs/<int:pair_id>"),
    (Comments, "/comments"),
    (CommentAction, "/comments/<int:id_>"),
    (Wishes, "/wishes"),
    (Brand, "/brand"),
    (Category, "/category"),
)
