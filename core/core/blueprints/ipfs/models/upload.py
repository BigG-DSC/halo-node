from core.extensions import db
from lib.util_sqlalchemy import ResourceMixin, AwareDateTime

class Upload(db.Model, ResourceMixin):
    
    __tablename__ = 'Upload'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(120))
    ipfs_hash = db.Column(db.String(200), unique=True)
    short_url = db.Column(db.String(50), unique=True)

    def __init__(self, filename, ipfs_hash, short_url=None):
        self.filename = filename
        self.ipfs_hash = ipfs_hash
        self.short_url = short_url

    @classmethod
    def find_by_identity(identity):
        """
        Find a file by its id.

        :param identity: File id
        :type identity: int
        :return: Upload instance
        """
        return Upload.query.filter(Upload.id == identity).first()

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'filename': self.filename,
            'ipfs_hash': self.ipfs_hash,
            'short_url': self.short_url
        }
