# Yddish Market

Prototype of a **marketplace for independent artisan brands**: each vendor gets a shop page, a product catalog and a profile, and visitors can browse every brand in one place.

Built with **Google AI Studio** as a fast way to go from idea to working app.

## Features
- Vendor profile (name, description, rating, verified badge, location)
- Product catalog per vendor
- Partner brand logos on the home page

## Stack
- **React** + **TypeScript** (Vite)
- **Gemini API** for AI features
- CSS

## Run locally
**Prerequisite:** Node.js

```bash
npm install
# add your key in .env.local
echo "GEMINI_API_KEY=your_key_here" > .env.local
npm run dev
```

## Status
Prototype: the catalog starts empty and vendor data is mocked in `constants.ts`.
