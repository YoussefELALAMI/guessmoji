from services.emoji_gen import generate_emoji

def test():
    category = "food"  # You can try other categories like "movies", "sports", etc.
    quizzes = generate_emoji(category)

    print("\nGenerated Emoji Quizzes:\n")
    for quiz in quizzes:
        print(f"Emojis: {quiz['emojis']}, Answer: {quiz['answer']}, Category: {quiz['category']}") # type: ignore

if __name__ == "__main__":
    test()
