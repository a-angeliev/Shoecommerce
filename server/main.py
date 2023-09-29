import json
import click
from flask import Flask, jsonify
from flask.views import MethodView
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash

from managers.auth import AuthManager
from managers.users import UserManager
from models import RoleType
from models.users import UsersModel, UserData
from config import create_app
from db import db
from resources.routes import routes
from decouple import config

from flask import request

# app = create_app()

# Comment app=create_app() and uncomment the flowling for migrate (flask db migrate , flask db upgrade)

app = Flask(__name__)


app.config.from_object("config.ProductionConfig")

db.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}})

migrate = Migrate(app, db)
api = Api(app)
[api.add_resource(*r) for r in routes]


@app.cli.command("create_superuser")
@click.argument("email")
@click.argument("password")
@click.argument('f_name')
@click.argument("l_name")
@click.argument("phone")
def create_superuser(email, password, f_name, l_name, phone):
    print(email, password, f_name, l_name, phone)
    user_data = UserData(**{"f_name": f_name, "l_name": l_name, "phone":phone})

    prime_user_data = {"email": email, "password": password}
    prime_user_data["password"] = generate_password_hash(
        prime_user_data["password"]
    )
    user = UsersModel(**prime_user_data)
    try:
        db.session.add(user_data)
        db.session.add(user)
        user.user_data = user_data
        db.session.commit()
        print(user)
    except Exception as ex:
        print(ex)

@app.cli.command("get_users")
def get_users():
    users = UsersModel.query.all()
    print(users)

@app.before_first_request
def create_tables():
    db.init_app(app)
    db.create_all()


@app.after_request
def apply_caching(response):

    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers[
        "Access-Control-Allow-Methods"
    ] = "GET,HEAD,POST,OPTIONS,PUT,DELETE"
    # response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    # response.headers["Access-Control-Allow-Headers"] = "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
    response.headers["Access-Control-Allow-Headers"] = "*"
    # response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.after_request
def close_request(response):
    try:
        db.session.commit()
    except:
        return response
    return response


if __name__ == "__main__":
    app.run()
