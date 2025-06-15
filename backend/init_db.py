# init_db.py : Database initialization script
from app import app
from models.database import db

with app.app_context():
    db.create_all()  # Create all tables in the database
    print(" ✅ Database initialized and tables created !")