from resources.auth import Login
from resources.brand import Brand
from resources.category import Category
from resources.products import Products, Product, ProductImages, ProductPairs
from resources.users import Register, User

routes = (
    (Register, "/register"),
    (Login, "/login"),
    (User, "/user/<int:id_>"),
    (Products, "/products"),
    (Product, "/products/product/<int:id_>"),
    (ProductImages, "/products/product/<int:id_>/images"),
    (ProductPairs, "/products/product/<int:id_>/pairs"),
    (Brand, "/brand"),
    (Category, "/category"),
)
