import json

from decouple import config
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import UsersModel
from db import db
from resources.routes import routes
from schemas import request


class DevelopmentConfig:
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = f"postgresql://{config('DB_USER')}:{config('DB_PASSWORD')}@localhost:{config('DB_PORT')}/{config('DB_NAME')}"


class TestConfig:
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = f"postgresql://{config('DB_USER')}:{config('DB_PASSWORD')}@localhost:{config('DB_PORT')}/{config('TEST_DB_NAME')}"

class ProductionConfig:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = f"{config('DB_URL')}"


def create_app(config="config.ProductionConfig"):
    app = Flask(__name__)
    # CORS(app)

    app.config.from_object(config)

    api = Api(app)
    migrate = Migrate(app, db)
    [api.add_resource(*route) for route in routes]

    return app
