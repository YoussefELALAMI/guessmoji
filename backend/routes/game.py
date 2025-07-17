# game.py : API routes logic, this file will contain the routes related to the game

from flask import Blueprint, jsonify, request
from models.database import Category, Emojis
from models.database import db

game_bp = Blueprint('api', __name__, url_prefix='/api')

@game_bp.route("/categories", methods=["GET"])
def get_categories():
    
    categories = Category.query.all()
    categories = [{"id": category.id, "name": category.name} for category in categories]
    return jsonify(categories), 200

@game_bp.route("/quizzes", methods=["GET"])
def get_quizzes():
    quizzes = Emojis.query.all()
    return jsonify([{"id": quiz.id, "emojis": quiz.emojis, "answer": quiz.answer, "category_id": quiz.category_id} for quiz in quizzes]), 200