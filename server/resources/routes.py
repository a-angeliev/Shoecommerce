from resources.auth import Login
from resources.brand import Brand, BrandUpdate
from resources.category import Category, CategoryHandel
from resources.comments import Comments, CommentAction
from resources.discounts import Discounts, DiscountsOperations, DiscountValidation
from resources.newsletter import Newsletter
from resources.orders import Orders, ChangeOrder
from resources.products import (
    Products,
    Product,
    ProductImages,
    ProductPairs,
    ProductPairEdit,
)
from resources.users import Register, User, UserComments, UserOrders
from resources.wishes import Wishes

routes = (
    (Register, "/register"),
    (Login, "/login"),
    (User, "/user/<int:id_>"),
    (UserOrders, "/user/<int:id_>/orders"),
    (UserComments, "/user/<int:id_>/comments"),
    (Products, "/products"),
    (Product, "/products/product/<int:id_>"),
    (ProductImages, "/products/product/<int:id_>/images"),
    (ProductPairs, "/products/product/<int:id_>/pairs"),
    (ProductPairEdit, "/products/product/<int:id_>/pairs/<int:pair_id>"),
    (Orders, "/orders"),
    (ChangeOrder, "/orders/<int:id_>"),
    (Comments, "/comments"),
    (CommentAction, "/comments/<int:id_>"),
    (Wishes, "/wishes"),
    (BrandUpdate, "/brand/<int:id_>"),
    (Brand, "/brand"),
    (CategoryHandel, "/category/<int:id_>"),
    (Category, "/category"),
    (Discounts, "/discounts"),
    (DiscountsOperations, "/discounts/<int:id_>"),
    (DiscountValidation, "/discounts/validate"),
    (Newsletter, "/newsletter"),
)
