from marshmallow import Schema, fields


class SubscribeNewsletterRequestSchema(Schema):
    email = fields.String(required=True)
    name = fields.String(required=True)


class UnsubscribeNewsletterRequestSchema(Schema):
    email = fields.String(required=True)