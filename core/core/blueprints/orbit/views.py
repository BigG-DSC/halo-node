from flask import Blueprint, jsonify, request
import requests
from werkzeug.utils import secure_filename

orbit = Blueprint('orbit', __name__, template_folder='templates')


@orbit.route('/status', methods = ['GET'])
def status():
    return jsonify({"status":"active"}), 200