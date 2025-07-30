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

@game_bp.route("/categories/<string:category_name>", methods=["GET"])
def get_category_id(category_name):
    category = Category.query.filter_by(name=category_name).first()
    if not category:
        return jsonify({"error": "Category id not found"}), 400
    return jsonify({"id": category.id}), 200

@game_bp.route("/quiz/<string:id>/<int:length>", methods=["GET"])
def get_quiz_by_id(id, length):
    quiz = Emojis.query.filter_by(category_id=id).order_by(Emojis.id.desc()).limit(length).all()
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    quiz = list(reversed(quiz))
    return jsonify([{"question": question.emojis, "answer": question.answer} for question in quiz]), 200

@game_bp.route("/start-quiz", methods=["POST"])
def start_quiz():
    data = request.get_json()
    if data is None:
        return jsonify({"error": "Missing JSON in request"}), 400
    category = data.get('category')
    custom_category = data.get('customCategory')
    difficulty = data.get('difficulty')
    number_of_questions = data.get('numberOfQuestions', 5)
    if ((not category 
         and not custom_category) 
        or not difficulty 
        or not isinstance(number_of_questions, int) 
        or number_of_questions <= 0 
        or number_of_questions > 15
        ):
        return jsonify({"error": "Invalid parameters"}), 400
    emojis = generate_emoji(custom_category or category, difficulty, number_of_questions)
    if not emojis:
        return jsonify({"error": "Failed to generate emojis"}), 500
    save_quizzes_to_db(emojis, custom_category or category)
    print("Saved quizzes to DB!")
    return jsonify({"category": category or custom_category,
                           "length": number_of_questions,
                             "questions": emojis}), 200