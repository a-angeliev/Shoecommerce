import json

from flask import request
from flask_restful import Resource

from managers.newsletter import NewsletterManager
from schemas.request.newsletter import SubscribeNewsletterRequestSchema, UnsubscribeNewsletterRequestSchema
from utils.decorators import validate_schema


class Newsletter(Resource):
    @staticmethod
    @validate_schema(SubscribeNewsletterRequestSchema)
    def post():
        response = NewsletterManager.subscribe(request.get_json())
        return json.dumps(response)

    @staticmethod
    @validate_schema(UnsubscribeNewsletterRequestSchema)
    def delete():
        response = NewsletterManager.unsubscribe(request.get_json())
        return json.dumps(response)

