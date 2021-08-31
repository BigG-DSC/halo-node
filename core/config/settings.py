from datetime import timedelta

DEBUG = True

# Server Configuration
HOST = 'localhost'
PORT = 8000
SECRET_KEY = 'insecurekeyfordev'

# SQLAlchemy
db_uri = 'postgresql://core:balancepwd@database:5432/core'
SQLALCHEMY_DATABASE_URI = db_uri
SQLALCHEMY_TRACK_MODIFICATIONS = False

# IPFS Configuration
IPFS_HOST = '192.168.1.84'
IPFS_PORT = 5001

# Redirect Configuration
SHORT_REDIRECT_DOMAIN = "http://{0}:{1}".format(HOST, PORT)
REDIRECT_BASE_URL = "http://ipfs.io/ipfs/"

# Upload Configuration
POOL_FILE_FOLDER = 'blueprints/pool/files/'
UPLOAD_FOLDER = 'core/blueprints/ipfs/files/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'json'])