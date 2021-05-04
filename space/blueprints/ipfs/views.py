import base62
import ipfshttpclient
import os

from flask import Blueprint, current_app, request, redirect, templating, url_for, render_template, flash, jsonify
from sqlite3 import IntegrityError
from werkzeug.utils import secure_filename

from space.blueprints.ipfs.models.upload import Upload
from space.extensions import db

ipfs = Blueprint('ipfs', __name__, template_folder='templates')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in current_app.config['ALLOWED_EXTENSIONS']

@ipfs.route('/')
def index():
    uploaded_objects = [i.serialize for i in Upload.query.all()]
    return jsonify(json_list=uploaded_objects), 200

@ipfs.route('/upload/<filename>', methods=['POST'])
def upload_file(filename):
    file = request.data

    if file and allowed_file(filename):            
        safe_filename = secure_filename(filename)
        with open(os.path.join(current_app.config['UPLOAD_FOLDER'], filename), "wb") as fo:
            fo.write(file)
        ipfs_api = ipfshttpclient.connect('/ip4/{}/tcp/{}/'.format(current_app.config['IPFS_HOST'], current_app.config['IPFS_PORT']))
        result = ipfs_api.add(os.path.join(current_app.config['UPLOAD_FOLDER'], safe_filename))

        try:
            new_upload = Upload(result['Name'], result['Hash'])
            db.session.add(new_upload)
            db.session.commit()

            new_upload_object = Upload.query.filter_by(filename=safe_filename).first()
            shortened = base62.encode(new_upload_object.id)
            new_upload_object.short_url = shortened
            db.session.commit()

            # success
            return 'Upload Complete'
        except:
           # danger
            return 'That hash already exists, passing.'

#@ipfs.route('/s/<short>')
#def redirect_to_short(short):
#    id = base62.decode(short)
#    uploaded_object = Upload.query.filter_by(id=id).first()
#    return redirect("{0}{1}".format(current_app.config['REDIRECT_BASE_URL'], uploaded_object.ipfs_hash), code=302)

