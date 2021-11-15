from flask import Flask
from itsdangerous import URLSafeTimedSerializer

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

    app.register_blueprint(peer)
    app.register_blueprint(ipfs)

    return app

