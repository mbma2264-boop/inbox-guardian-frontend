# Inbox Guardian Starter

Starter code for an **automation-first email triage app** focused on:
- scam detection
- opportunity detection
- personal vs transactional separation
- safe unsubscribe / report / quarantine recommendations

This repo gives you a **working starter** with:
- **FastAPI** backend
- **Next.js App Router** frontend
- deterministic **rules-first classifier**
- optional **OpenAI Responses API** explanation enhancer
- Gmail OAuth URL generation
- Gmail OAuth code exchange
- latest Gmail message fetch + classification preview

## What works now

- classify pasted email content through the backend
- connect Gmail through a real OAuth code exchange
- store Gmail access/refresh tokens in a **local JSON development store**
- fetch Gmail profile info
- fetch the latest Gmail messages
- classify fetched Gmail messages through the rules-first pipeline
- basic dashboard UI to review fetched mail

## What still needs to be built

- encrypted database persistence instead of local JSON token storage
- real multi-user auth/session management
- background workers and webhooks/watch subscriptions
- safe unsubscribe executor
- provider spam/phishing reporting executor
- quarantine and hold-window workflow
- message persistence and audit log tables

## Folder structure

```text
backend/
  app/
    api/
    core/
    services/
  tests/
frontend/
  app/
  components/
```

## Local setup

### 1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### 2) Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:8000`

## Environment variables

### backend/.env

```env
APP_ENV=development
APP_NAME=Inbox Guardian API
FRONTEND_ORIGIN=http://localhost:3000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.1-mini
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:8000/api/gmail/oauth/callback
GOOGLE_SCOPES=openid,email,https://www.googleapis.com/auth/gmail.readonly,https://www.googleapis.com/auth/gmail.modify
TOKEN_STORE_PATH=.data/gmail_connections.json
OAUTH_STATE_TTL_SECONDS=900
```

### frontend/.env.local

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Gmail setup notes

1. Create a Google OAuth client for a web application.
2. Add `http://localhost:8000/api/gmail/oauth/callback` as an authorized redirect URI.
3. Set the Gmail scopes in `.env`.
4. Start the backend and frontend, then click **Connect Gmail** on the homepage.

## API endpoints

- `GET /health`
- `POST /api/classify`
- `GET /api/gmail/oauth/start`
- `GET /api/gmail/oauth/login`
- `GET /api/gmail/oauth/callback`
- `GET /api/gmail/connections`
- `GET /api/gmail/connections/{connection_id}/profile`
- `GET /api/gmail/connections/{connection_id}/sync`

## Recommended next steps

1. Replace local token storage with encrypted database storage.
2. Persist fetched messages and classifications in PostgreSQL.
3. Add Gmail watch/subscription sync instead of manual refresh.
4. Add quarantine + audit log tables.
5. Add unsubscribe/report executors with hold-window safeguards.
6. Add real auth for users and per-user ownership of connections.

## Notes

- The OpenAI step is optional. If no API key is set, the backend uses rules-only classification.
- The Gmail token store is **development-only** and should not be used in production.
- The classifier is intentionally conservative around personal and transactional email.
