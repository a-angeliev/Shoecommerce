from resources.auth import Login
from resources.brand import Brand
from resources.category import Category
from resources.products import Products
from resources.users import Register, User

routes = (
    (Register, "/register"),
    (Login, "/login"),
    (User, "/user/<int:id_>"),
    (Products, "/products"),
    (Brand, "/brand"),
    (Category, "/category"),
)
