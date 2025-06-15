from services.emoji_gen import generate_emoji, save_quizzes_to_db
from models.database import db
from app import app

with app.app_context():  # required to access the Flask database
    category = "Countries"
    emojis = generate_emoji(category)
    print("Generated:", emojis)
    save_quizzes_to_db(emojis, category) # type: ignore
    print("Saved quizzes to DB!")
