from dotenv import load_dotenv
from flask import jsonify

load_dotenv()

import cloudinary
import cloudinary.uploader
import cloudinary.api

config = cloudinary.config(secure=True)


class Cloudinary:
    @staticmethod
    def upload_img(uploaded_file):
        upload_result = cloudinary.uploader.upload(uploaded_file)
        return jsonify(upload_result)
