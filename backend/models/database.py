# database.py : SQLite setup

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    def __repr__(self):
        return f"<Category {self.name}>"
    
class Emojis(db.Model):
    __tablename__ = 'emojis'
    id = db.Column(db.Integer, primary_key=True)
    emojis = db.Column(db.Text, nullable=False)
    answer = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    category = db.relationship('Category', backref=db.backref('emojis', lazy=True)) 

    def __repr__(self):
        return f"<Emojis {self.emojis} - {self.answer}>"