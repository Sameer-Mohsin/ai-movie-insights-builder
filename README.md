# 🎬 AI Movie Insight Builder

AI-powered movie analysis tool that takes an IMDb movie ID and displays rich movie details including title, poster, cast, rating, plot summary, and AI-generated audience sentiment analysis.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-yellow?logo=javascript)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-blue?logo=google)

## ✨ Features

- **Movie Details** — Title, poster, year, runtime, rating, genre, director, cast, awards, box office
- **AI Sentiment Analysis** — Google Gemini analyzes real audience reviews from TMDB
- **Sentiment Classification** — Positive / Mixed / Negative with visual indicators
- **Key Themes Extraction** — AI identifies recurring topics from reviews
- **Premium Dark UI** — Cinematic glassmorphism design with gold accents and animations
- **Input Validation** — Real-time IMDb ID format validation
- **Progressive Loading** — Movie data shown first, sentiment loads in background
- **Responsive Design** — Mobile-first layout that works on all screen sizes
- **Error Handling** — Graceful handling of invalid IDs, API failures, and missing reviews

## 🏗️ Tech Stack

| Layer       | Technology                  |
|-------------|----------------------------|
| Framework   | Next.js 15 (App Router)    |
| Language    | JavaScript (ES2024)        |
| UI          | React 19 + Vanilla CSS     |
| Movie Data  | OMDb API                   |
| Reviews     | TMDB API                   |
| AI/Sentiment| Google Gemini AI           |
| Deployment  | Vercel                     |

## 📁 Project Structure

```
ai-movie-insight-builder/
├── app/
│   ├── api/
│   │   ├── movie/route.js       # OMDb movie data endpoint
│   │   ├── reviews/route.js     # TMDB audience reviews endpoint
│   │   └── sentiment/route.js   # Gemini AI sentiment analysis endpoint
│   ├── globals.css              # Design system + all styles
│   ├── layout.js                # Root layout with SEO metadata
│   └── page.js                  # Main page (orchestrates full flow)
├── components/
│   ├── SearchBar.js             # IMDb ID input with validation
│   ├── MovieHero.js             # Movie poster + title + metadata
│   ├── PlotSection.js           # Plot summary + director/awards
│   ├── CastList.js              # Horizontal scrollable cast list
│   ├── SentimentPanel.js        # AI sentiment badge + summary + themes
│   ├── SkeletonLoader.js        # Shimmer loading placeholders
│   └── ErrorCard.js             # Graceful error display
├── .env.local                   # API keys (not committed)
├── .env.example                 # API keys template
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- API keys for:
  - [OMDb API](http://www.omdbapi.com/apikey.aspx) (free)
  - [TMDB API](https://www.themoviedb.org/signup) (free)
  - [Google Gemini](https://aistudio.google.com/apikey) (free)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-movie-insight-builder.git
   cd ai-movie-insight-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your API keys:
   ```
   OMDB_API_KEY=your_omdb_key
   TMDB_API_KEY=your_tmdb_key
   GEMINI_API_KEY=your_gemini_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. Enter a valid IMDb ID (e.g., `tt0133093` for The Matrix)
2. Click **Search Movie**
3. View movie details, cast, and plot
4. Wait for the AI sentiment analysis to complete

> **Tip:** Find IMDb IDs from movie URLs: `imdb.com/title/tt0133093/`

## 🔌 API Routes

| Method | Endpoint          | Description                    |
|--------|-------------------|--------------------------------|
| GET    | `/api/movie?id=`  | Fetch movie data from OMDb     |
| GET    | `/api/reviews?id=`| Fetch audience reviews from TMDB |
| POST   | `/api/sentiment`  | Analyze sentiment via Gemini AI |

## 🎨 Design

- **Theme:** Dark cinematic with gold (#d4af37) accents
- **Typography:** Playfair Display (headings) + Inter (body)
- **Effects:** Glassmorphism cards, shimmer loaders, fade-in animations
- **Responsive:** Mobile-first with breakpoints at 768px and 480px

## 📦 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables (`OMDB_API_KEY`, `TMDB_API_KEY`, `GEMINI_API_KEY`)
4. Click **Deploy**

## 📝 Assumptions

- Users have basic familiarity with IMDb and know how to find movie IDs
- OMDb free tier allows 1,000 requests/day
- TMDB API has generous rate limits for free usage
- Gemini AI free tier supports the volume needed for individual use
- Sentiment analysis quality depends on the number/quality of TMDB reviews available

## 📄 License

MIT
