# Eisenbund Website

Lightweight React + Vite site for the Eisenbund shop.

## Setup
1. Copy `.env.example` to `.env` and fill the `VITE_FIREBASE_*` variables.
2. Install dependencies: `npm ci` or `npm install`
3. Start dev server: `npm run dev` → http://localhost:5173

## Firebase
See `FIREBASE_SETUP.md` for step-by-step instructions to enable Google Authentication and hosting.

## Scripts
- `npm run dev` - local dev server
- `npm run build` - production build
- `node scripts/check_firebase_env.cjs` - checks required VITE_FIREBASE_* vars

---

If you want, I can also create a GitHub repo (push + create remote) if you provide a GitHub token or are signed in with the GitHub CLI (`gh`).