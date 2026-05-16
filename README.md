# ContentForge

An AI-powered eCommerce content generator built with React.js and the Claude API (Anthropic). Generates product descriptions, SEO meta tags, email campaigns, social captions, and abandoned cart recovery emails — in multiple languages and tones.

🔗 **Live demo:** https://contentforge.vercel.app *(update after deploy)*

## Features

- 5 content types: product descriptions, SEO meta, email campaigns, social captions, abandoned cart emails
- 5 tones: professional, friendly, persuasive, luxury, urgent
- 5 languages: English, Italian, Spanish, French, German
- Prompt engineering library — `prompts.js` builds structured prompts with context injection
- Generation history — last 20 outputs persisted in localStorage, click any to restore
- Copy to clipboard + download as .txt
- Clean loading state with animated dots

## Tech Stack

- React 18 — functional components, custom hooks
- Custom hook `useClaudeApi` — wraps the Anthropic /v1/messages endpoint
- Prompt engineering — `buildPrompt()` constructs structured prompts per content type
- CSS Modules — scoped styles, no CSS-in-JS
- localStorage — persistent history without a backend
- Deployed on Vercel

## Getting Started

### 1. Get an Anthropic API key

Sign up at [console.anthropic.com](https://console.anthropic.com) and create an API key.

### 2. Clone and configure

```bash
git clone https://github.com/GenerosoFerrara/contentforge.git
cd contentforge
cp .env.example .env
```

Open `.env` and add your key:
```
REACT_APP_CLAUDE_KEY=sk-ant-...
```

### 3. Install and run

```bash
npm install
npm start
```

App runs at `http://localhost:3000`.

## Deploy to Vercel

```bash
git init && git add . && git commit -m "feat: ContentForge AI content generator"
git remote add origin https://github.com/GenerosoFerrara/contentforge.git
git push -u origin main
```

On [vercel.com](https://vercel.com): Import → select repo → add environment variable `REACT_APP_CLAUDE_KEY` → Deploy.

## Project Structure

```
src/
├── components/
│   ├── GeneratorForm.jsx   # Form — type, tone, language, product details
│   ├── OutputPanel.jsx     # Generated text display + copy + download
│   └── HistoryPanel.jsx    # localStorage history, click to restore
├── hooks/
│   └── useClaudeApi.js     # Custom hook — Claude API fetch, loading, error
├── utils/
│   ├── prompts.js          # Prompt engineering library — buildPrompt()
│   └── history.js          # localStorage read/write helpers
└── App.jsx                 # Root — state, layout, orchestration
```

## Prompt Engineering

Each content type uses a structured prompt template in `prompts.js`:

```js
buildPrompt({ type, product, category, price, tone, language, extra })
// → "You are an expert eCommerce copywriter. Write in Italian. Tone: persuasive.
//    Product: Wireless Headphones Pro X200
//    Category: Electronics / Price: €129.99
//    Task: Write a compelling product description (150-200 words)..."
```

The prompt injects all context before the instruction, ensuring consistent and relevant output from the model.

## Why I built this

I spent years managing eCommerce stores, writing product descriptions and email campaigns manually. This tool automates that workflow using AI — and demonstrates how prompt engineering can produce structured, usable marketing copy at scale.

---

Built by [Generoso Ferrara](https://linkedin.com/in/generoso-ferrara)
