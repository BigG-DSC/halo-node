from flask import Blueprint, jsonify, request
import requests
from werkzeug.utils import secure_filename

peer = Blueprint('peer', __name__, template_folder='templates')


@peer.route('/getRequests', methods = ['GET'])
def getRequests():
    r = requests.get('http://192.168.33.10:4000/getPolls')
    return r.json(), 200

@peer.route('/inFavour', methods = ['POST'])
def inFavour():
    input_json = request.get_json(force=True) 
    r = requests.post('http://192.168.33.10:4000/inFavour/'+input_json["request_id"])
    return r.json(), 200

@peer.route('/against', methods = ['POST'])
def against():
    input_json = request.get_json(force=True) 
    r = requests.post('http://192.168.33.10:4000/against/'+input_json["request_id"])
    return r.json(), 200

@peer.route('/getFriends')
def getFriends():
    r = requests.get('http://192.168.33.10:4000/getFriends')
    return r.json(), 200

@peer.route('/status', methods = ['GET'])
def status():
    return jsonify({"status":"active"}), 200