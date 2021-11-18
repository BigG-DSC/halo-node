from flask import Flask
import glob
import json
import pyqrcode
import png
from itsdangerous import URLSafeTimedSerializer

from core.blueprints.page import page
from core.blueprints.peer import peer
from core.blueprints.ipfs import ipfs

def create_app(settings_override=None):
    """
    Create a Flask application using the app factory pattern.

    :param settings_override: Override settings
    :return: Flask app
    """
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object('config.settings')
    app.config.from_pyfile('settings.py', silent=True)

    if settings_override:
        app.config.update(settings_override)

    app.register_blueprint(page)
    app.register_blueprint(peer)
    app.register_blueprint(ipfs)

    app.config['app_language'] = 'en_US'
    languages = {}
    language_list = glob.glob("/core/core/translations/*.json")
    for lang in language_list:
        filename = lang.split('/')
        lang_code = filename[-1].split('.')[0]

        with open(lang, 'r', encoding='utf8') as file:
            languages[lang_code] = json.loads(file.read())
    app.config['languages'] = languages

    # String which represents the QR code
    s = "http://localhost:8000/status"
    url = pyqrcode.create(s)
    url.png('/core/core/static/images/myqr.png', scale = 10, module_color=[0, 0, 0, 255], background=[0, 0, 0, 0])

    return app

