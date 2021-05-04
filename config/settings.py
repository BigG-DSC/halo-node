from datetime import timedelta

DEBUG = True

# Server Configuration
HOST = 'localhost'
PORT = 8000
SECRET_KEY = 'insecurekeyfordev'

# SQLAlchemy
db_uri = 'postgresql://space:devpassword@postgres:5432/space'
SQLALCHEMY_DATABASE_URI = db_uri
SQLALCHEMY_TRACK_MODIFICATIONS = False

# IPFS Configuration
IPFS_HOST = '192.168.1.84'
IPFS_PORT = 5001

# Redirect Configuration
SHORT_REDIRECT_DOMAIN = "http://{0}:{1}".format(HOST, PORT)
REDIRECT_BASE_URL = "http://ipfs.io/ipfs/"

# Upload Configuration
UPLOAD_FOLDER = 'space/blueprints/ipfs/files/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])