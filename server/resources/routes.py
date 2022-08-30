from resources.auth import Login
from resources.users import Register, User

routes = ((Register, "/register"), (Login, "/login"), (User, "/user/<int:id_>"))
