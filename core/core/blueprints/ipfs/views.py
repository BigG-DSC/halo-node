from flask import Blueprint, jsonify, request, g
import requests

ipfs = Blueprint('ipfs', __name__, template_folder='templates')


@ipfs.route('/isAlive', methods = ['GET'])
def isAlive():
    res = requests.get("http://orbit:4000/isAlive")
    return res.json(), 200

@ipfs.route('/getDataLocation', methods = ['POST'])
def getDataLocation():
    return jsonify({"response":"endpoint not implemented"}), 200

@ipfs.route('/getData', methods = ['POST'])
def getData():
    res = requests.post("http://orbit:4000/getData")
    return res.json(), 200

@ipfs.route('/storeData', methods = ['POST'])
def storeData():
    json = request.json

    fjson = {}
    fjson['token'] = json['token']
    fjson['testNumber'] = json['id']
    fjson['content'] = json
    
    res = requests.post("http://orbit:4000/storeData", fjson)
    return res.json(), 200

@ipfs.route('/deleteData', methods = ['POST'])
def deleteData():
    return jsonify({"response":"endpoint not implemented"}), 200