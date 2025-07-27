# game.py : API routes logic, this file will contain the routes related to the game

from flask import Blueprint, jsonify, request
from models.database import Category, Emojis
from services.emoji_gen import generate_emoji, save_quizzes_to_db

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

@game_bp.route("/start-quiz", methods=["POST"])
def start_quiz():
    data = request.get_json()
    if data is None:
        return jsonify({"error": "Missing JSON in request"}), 400
    category = data.get('category')
    custom_category = data.get('customCategory')
    difficulty = data.get('difficulty')
    number_of_questions = data.get('numberOfQuestions', 5)
    if (not category and not custom_category) or not difficulty or not isinstance(number_of_questions, int) or number_of_questions <= 0 or number_of_questions > 15:
        return jsonify({"error": "Invalid parameters"}), 400
    emojis = generate_emoji(custom_category or category, difficulty, number_of_questions)
    if not emojis:
        return jsonify({"error": "Failed to generate emojis"}), 500
    save_quizzes_to_db(emojis, custom_category or category)
    print("Saved quizzes to DB!")
    # Ensure a valid response is always returned
    return jsonify({"message": "Quiz started", "category": category, "customCategory": custom_category, "difficulty": difficulty, "numberOfQuestions": number_of_questions}), 200