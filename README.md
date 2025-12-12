# 🚀 MaxMate.ai

> **The AI Operating System for Your Work & Life**

MaxMate.ai is an all-in-one AI solution platform that dynamically generates personalized AI toolkits based on user personas. Input your profession and hobbies, and get a curated collection of AI tools tailored to your unique work and life needs.

![MaxMate.ai Demo](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80)

## ✨ Features

### 🎯 Smart Persona Matching
- **Work Mode**: AI tools optimized for your profession
- **Life Mode**: AI apps that enhance your hobbies and interests
- **Real-time Generation**: Powered by Gemini 2.5 Flash AI

### 🎨 Beautiful UI/UX
- Modern Bento Grid layout
- Smooth Framer Motion animations
- Fully responsive design
- Dark/Light mode support

### 🔍 SEO/GEO Optimized
- Server-side rendering (SSR/SSG)
- Dynamic meta tags and Open Graph
- JSON-LD structured data
- AI bot friendly (GPTBot, PerplexityBot)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion

### Backend
- **Framework**: FastAPI (Python)
- **AI Model**: Google Gemini 2.5 Flash
- **Validation**: Pydantic v2

### Infrastructure
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Railway
- **Database**: Supabase (PostgreSQL)

## 📁 Project Structure

```
kimimate.ai/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   └── lib/             # Utilities & API client
│   └── package.json
│
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/             # API endpoints
│   │   ├── services/        # Business logic
│   │   └── config.py        # Configuration
│   └── requirements.txt
│
├── docs/                     # Documentation
├── start.sh                  # One-click start script
└── stop.sh                   # Stop all services
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kimiguo1109/toolmate.ai.git
cd toolmate.ai
```

2. **Set up environment variables**

Backend (`backend/.env`):
```env
GEMINI_API_KEY=your_gemini_api_key
USE_PROXY=false
```

Frontend (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:18512
```

3. **Start the application**
```bash
# One-click start (macOS/Linux)
./start.sh

# Or manually:
# Terminal 1 - Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 18512 --reload

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
```

4. **Open your browser**
- Frontend: http://localhost:3000
- Backend API: http://localhost:18512
- API Docs: http://localhost:18512/docs

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/generate` | Generate AI toolkit |
| GET | `/api/suggest` | Search suggestions |
| GET | `/api/professions` | List professions |
| GET | `/api/hobbies` | List hobbies |

### Generate Toolkit Example

```bash
curl -X POST http://localhost:18512/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "profession": "designer",
    "hobby": "photography",
    "name": "Alex",
    "use_ai": true
  }'
```

## 🎯 Use Cases

| Profession | + Hobby | = Personalized Toolkit |
|------------|---------|------------------------|
| Developer | Gaming | GitHub Copilot, Cursor, Discord AI |
| Designer | Photography | Figma AI, Midjourney, Lightroom AI |
| Marketer | Traveling | Jasper AI, TripIt, Hopper |
| Student | Reading | Notion AI, Blinkist, Readwise |

## 🌐 Deployment

### Frontend → Vercel
1. Import from GitHub
2. Set Root Directory: `frontend`
3. Add environment variables
4. Deploy

### Backend → Railway
1. Deploy from GitHub
2. Set Root Directory: `backend`
3. Set Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables
5. Deploy

## 📊 Business Model

- **Freemium**: Free toolkit generation with AI recommendations
- **Pro ($19/mo)**: Unlimited toolkits, sync across devices
- **Team ($49/mo)**: Team collaboration, shared toolkits

## 🗺️ Roadmap

- [x] MVP: Onboarding → AI Generation → Toolkit Dashboard
- [x] SEO/GEO optimization
- [x] Gemini 2.5 Flash integration
- [ ] User authentication (Supabase)
- [ ] Toolkit persistence
- [ ] Chrome extension
- [ ] Mobile app

## 📄 License

MIT License - feel free to use for your own projects!

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR.

## 📧 Contact

- **GitHub**: [@kimiguo1109](https://github.com/kimiguo1109)
- **Project**: [toolmate.ai](https://github.com/kimiguo1109/toolmate.ai)

---

<p align="center">
  Built with ❤️ using Next.js, FastAPI & Gemini AI
</p>

