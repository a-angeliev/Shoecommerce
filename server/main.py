from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from models.users import UsersModel, UserData
from config import create_app
from db import db
from resources.routes import routes
from decouple import config

# app = create_app()

# Comment app=create_app() and uncomment the flowling for migrate (flask db migrate , flask db upgrade)

app = Flask(__name__)
app.config.from_object("config.DevelopmentConfig")
db.init_app(app)

migrate = Migrate(app, db)
api = Api(app)
[api.add_resource(*r) for r in routes]


@app.before_first_request
def create_tables():
    db.init_app(app)
    db.create_all()


@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers[
        "Access-Control-Allow-Methods"
    ] = "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Origin"] = "*"
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
