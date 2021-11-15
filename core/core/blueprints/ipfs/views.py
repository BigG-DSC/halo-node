from flask import Blueprint, jsonify, request
import requests

ipfs = Blueprint('ipfs', __name__, template_folder='templates')


@ipfs.route('/getIpfsStatus', methods = ['POST'])
def getIpfsStatus():
    return jsonify({"response":"endpoint not implemented"}), 200

@ipfs.route('/getDataLocation', methods = ['POST'])
def getDataLocation():
    return jsonify({"response":"endpoint not implemented"}), 200

@ipfs.route('/getData', methods = ['POST'])
def getData():
    return jsonify({"response":"endpoint not implemented"}), 200

@ipfs.route('/storeData', methods = ['POST'])
def storeData():
    return jsonify({"response":"endpoint not implemented"}), 200