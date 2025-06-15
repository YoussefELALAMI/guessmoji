# app.py : Main application entry point

from flask import Flask
from flask_cors import CORS
from routes.game import game_bp
from models.database import db

app = Flask(__name__)
CORS(app)
app.register_blueprint(game_bp)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///guessmoji.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable SQLAlchemy tracking modifications to save memory

db.init_app(app)  # Initialize the SQLAlchemy instance with the Flask app

if __name__ == "__main__": # => This block ensures the app runs only when executed directly, not imported
    app.run(debug=True)