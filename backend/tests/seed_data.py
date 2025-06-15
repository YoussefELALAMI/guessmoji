# seed_data.py : Script to seed the database with initial data

from app import app
from models.database import db, Category, Emojis

with app.app_context():
    # Create categories
    categories = [
        Category(name="Food"), # type: ignore
        Category(name="Movies") # type: ignore
    ]

    db.session.add_all(categories)
    db.session.commit()
    print(" ✅✅ Categories added: " + ", ".join([cat.name for cat in categories]))

    # Create emojis
    quiz_data = [
        Emojis(emojis="🍕🍟🥤", answer="Fast food", category_id=categories[0].id), # type: ignore
        Emojis(emojis="🍣🍱", answer="Sushi", category_id=categories[0].id), # type: ignore
        Emojis(emojis="🍔🍟", answer="Burger", category_id=categories[0].id), # type: ignore
        Emojis(emojis="🚢❄️💑🎻", answer="Titanic", category_id=categories[1].id), # type: ignore
        Emojis(emojis="🦁👑", answer="The Lion King", category_id=categories[1].id), # type: ignore
        Emojis(emojis="🧙‍♂️⚡️", answer="Harry Potter", category_id=categories[1].id), # type: ignore
    ]

    db.session.add_all(quiz_data)
    db.session.commit()
    
    print(" ✅✅ Emoji quizzes added!")