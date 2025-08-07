# 🎯 GuessMoji

**Can you guess the word from emojis?** Challenge yourself with AI-generated emoji puzzles covering food, movies, and more!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

## 🎮 What is GuessMoji?

GuessMoji is an interactive word-guessing game where players decode words from creative emoji combinations. Using AI-powered puzzle generation, the game creates challenging and fun emoji riddles across multiple categories.

### ✨ Features

- 🤖 **AI-Powered Puzzles**: Dynamic emoji puzzle generation using OpenAI
- 🎭 **Multiple Categories**: Food, movies, and expandable content types
- 📱 **Responsive Design**: Angular-based frontend for seamless gameplay
- 🏆 **Score Tracking**: SQLite database for game progress and statistics
- 🎨 **Interactive UI**: Clean, modern interface with real-time feedback
- 🔄 **Endless Content**: Continuously generated fresh challenges

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/guessmoji.git
   cd guessmoji
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your OpenAI API key
   ```

4. **Frontend Setup** *(Coming Soon)*
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   python app.py
   ```

2. **Start the Frontend** *(Coming Soon)*
   ```bash
   cd frontend
   ng serve
   ```

3. **Open your browser** to `http://localhost:4200`

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Angular + TypeScript | User interface and game logic |
| **Backend** | Python Flask | API server and business logic |
| **Database** | SQLite | Data persistence and scoring |
| **AI** | OpenAI API | Emoji puzzle generation |

### Project Structure

```
guessmoji/
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── routes/
│   │   └── game.py         # Game API endpoints
│   ├── services/
│   │   └── emoji_gen.py    # AI-powered emoji generation
│   ├── models/
│   │   └── database.py     # SQLite database models
│   ├── data/
│   │   └── items.json      # Predefined categories data
│   ├── .env                # Environment variables
│   └── requirements.txt    # Python dependencies
├── frontend/               # Angular application (in development)
└── README.md
```

## 🎯 API Endpoints

### Game Endpoints

- `GET /api/puzzle` - Get a new emoji puzzle
- `POST /api/guess` - Submit a guess for verification
- `GET /api/categories` - List available puzzle categories
- `GET /api/leaderboard` - Get top scores

### Example Response

```json
{
  "puzzle_id": "123",
  "emojis": "🍕🧀🍅",
  "category": "food",
  "hint": "Italian dish",
  "difficulty": "medium"
}
```

## 🎨 Game Features

### Puzzle Categories

- 🍕 **Food & Cuisine**: Dishes, ingredients, and culinary delights
- 🎬 **Movies**: Classic films, blockbusters, and cult favorites
- 🎵 **Music** *(Coming Soon)*: Songs, artists, and albums
- 🏆 **Sports** *(Coming Soon)*: Teams, events, and terminology

### Difficulty Levels

- **Easy**: Common words with obvious emoji connections
- **Medium**: Requires some lateral thinking
- **Hard**: Abstract concepts and wordplay

### Scoring System

- Base points for correct guesses
- Bonus points for speed
- Streak multipliers for consecutive correct answers
- Penalty reduction for hints used

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests** (when available)
5. **Submit a pull request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use Angular style guide for TypeScript
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
FLASK_ENV=development
DATABASE_URL=sqlite:///guessmoji.db
SECRET_KEY=your_secret_key_here
```

## 🧪 Testing

```bash
# Backend tests
cd backend
python -m pytest tests/

# Frontend tests (coming soon)
cd frontend
ng test
```

## 📊 Roadmap

- [x] Backend API development
- [x] AI puzzle generation
- [x] SQLite database setup
- [x] Angular frontend completion
- [ ] User authentication system
- [ ] Multiplayer mode
- [ ] Mobile app version
- [ ] Additional puzzle categories
- [ ] Social sharing features
- [ ] Unit and integration testing
- [ ] CI/CD pipeline integration
- [ ] Docker deployment
- [ ] Live demo deployment
- [ ] Leaderboard with Twitch/Streamer mode
- [ ] Advanced AI features (difficulty tuning, hints)
- [ ] Usage analytics and logs
- [ ] Demo video + media preview in README
- [ ] Proper license file and GitHub topics

---

## ✅ To-Do List & Features in Progress

> A prioritized list of what’s next, including brief guidance for each task.

### 🔐 1. Authentication & User Profiles
- Implement login/signup system (JWT or OAuth with Google/GitHub/Twitch/Kick).
- Store player stats and scores by user account.
- 📌 *Suggested tools*: `Flask-JWT-Extended`, `Flask-OAuthlib`, `Angular OAuth`, `Firebase Auth`.

### 🧪 2. Testing & CI/CD
- Expand `pytest` backend test coverage.
- Add frontend tests (Angular CLI with Jasmine/Karma).
- Configure GitHub Actions for CI pipelines (test, build, deploy).
- 📌 *Suggested file*: `.github/workflows/ci.yml`

### 🚀 3. Deployment & DevOps
- Finalize `Dockerfile` for frontend and backend.
- Use `docker-compose` for full-stack local dev.
- Deploy:
  - Backend: Render, Railway, or Heroku
  - Frontend: Vercel, Netlify
- 📌 Add `DEPLOYMENT.md` guide (optional).

### 🕹️ 4. Real-Time Multiplayer Mode
- Use WebSockets: `Flask-SocketIO` + Angular WebSocket service.
- Add multiplayer game rooms with shared guessing sessions.
- Optionally enable streamer participation (Twitch API).

### 🏆 5. Leaderboard & Social Features
- Add global leaderboard with filtering (day/week/all-time).
- Enable Twitch/Kick "streamer mode" with live results screen.
- Add shareable game results (Twitter, WhatsApp).
- 📌 Backend: SQLite schema update, API routes.  
  Frontend: Angular Material table, animations.

### 🧠 6. Expand AI Use
- Add hint generation (first letter, partial reveal).
- Use GPT prompt engineering or function calling for difficulty tuning.
- Optionally explore embeddings (OpenAI or Cohere) for better matching.

### 📈 7. Analytics & Logging
- Add analytics tools: Google Analytics, PostHog, or Matomo.
- Improve logging using `logging` module + external service (e.g., Sentry).
- Track usage: category preference, error rate, time spent.

### 🎨 8. Polish & Documentation
- Add gameplay GIF or video preview in README (Loom, Peek).
- Include a public live demo link.
- Add MIT license file and GitHub tags like `#game`, `#openai`, `#angular`, `#flask`.


## 📞 Support
- 📧 **Contact**: youssef2003elalami@gmail.com

---

**Ready to play?** Clone the repo and start guessing! 🎉
