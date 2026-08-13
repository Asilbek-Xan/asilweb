# Asilbek Portfolio — API Projects Edition

This version keeps the existing Skills, Experience, Messages and other portfolio data in their original localStorage/default setup. **Only Projects are connected to the Django API.**

## Project API

Base URL:
`https://backendenoughdd.pythonanywhere.com`

Projects:
- GET `/api/projects/`
- POST `/api/projects/`
- PATCH `/api/projects/<id>/`
- DELETE `/api/projects/<id>/`

The frontend sends `technologies` as the comma-separated string expected by the backend and safely converts it to an array for display.

## Admin login

This frontend-only admin gate uses:
- Username: `Asilbek`
- Password: `12345`

This is intentionally a simple frontend gate as requested. It is not a secure backend authentication system; the credentials are present in the client bundle. Backend API permissions still determine whether project POST/PATCH/DELETE requests are accepted.

## Run

```bash
npm install
npm run dev
```

## Vercel

Set this environment variable if you want to override the default backend:

```env
VITE_API_BASE_URL=https://backendenoughdd.pythonanywhere.com
```

The included `vercel.json` supports SPA routes.
