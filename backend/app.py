# app.py : Main application entry point

from flask import Flask # type: ignore
from routes.game import game_bp

app = Flask(__name__)
app.register_blueprint(game_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)