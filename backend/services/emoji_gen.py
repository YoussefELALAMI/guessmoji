# emoji_gen.py : AI logic (emoji generation)

from dotenv import load_dotenv
from openai import OpenAI
import json
import os
from models.database import db, Emojis, Category

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_emoji(category: str) -> list[str]:
    """
    Generate a list of emojis based on the given category.
    """
    prompt = (
        f"Generate 5 fun emoji quizzes for the category '{category}'. "
        "Each quiz should contain:\n"
        "- 1 line of 2 to 4 emojis as the question\n"
        "- The correct answer as a string (e.g. 'Pizza', 'Titanic', 'Soccer', 'The Lion King')\n"
        "- Output format: JSON list of objects like "
        "[{'emojis': '🐱👸', 'answer': 'The Lion King'}]"
    )

    # send the prompt to the OpenAI and handle the response
    try:
        response = client.chat.completions.create( # type: ignore
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI that generates creative professional artistic emoji quizzes."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )
    except Exception as e:
        print(f"Error generating emojis: {e}")
        return []
    
    # parse the response
    messages = response.choices[0].message.content

    try:
        quizzes = json.loads(messages) # type: ignore
    except json.JSONDecodeError as e:
        print(f"Failed to parse OpenAI response: {e}")
        return []

    for quiz in quizzes:
        quiz["category"] = category

    return quizzes

def save_quizzes_to_db(quizzes: list[dict], category: str) -> None:
    """
    Save the generated quizzes to the database.
    """
    category_obj = Category.query.filter_by(name=category).first()
    if not category_obj:
        category_obj = Category(name=category) # type: ignore
        db.session.add(category_obj)
        db.session.commit()

    for quiz in quizzes:
        emoji_entry = Emojis(
            emojis=quiz["emojis"], # type: ignore
            answer=quiz["answer"], # type: ignore
            category_id=category_obj.id # type: ignore
        )
        db.session.add(emoji_entry)

    try:
        db.session.commit()
    except Exception as e:
        print(f"❌ Error saving quizzes to DB: {e}")
        db.session.rollback()