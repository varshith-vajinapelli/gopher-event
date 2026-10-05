# Gopher Event

A campus event platform for finding, creating, and registering for events, built for the University of Minnesota.

[![Try it live](https://img.shields.io/badge/Try_it_live-gopherevent.com-FFCC33?style=for-the-badge&labelColor=7A0019)](https://gopherevent.com)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## Demo

https://github.com/user-attachments/assets/95a2cb8d-627c-47a8-ad37-3b542fbda39b

Searching "relax and unwind" surfaces a yoga event even though no words in the title match.

## Features

**Search**
- Semantic search finds events by meaning, using Gemini embeddings and pgvector cosine similarity.
- Title matching runs alongside it, and results are shown in separate sections without duplicates.
- If embedding generation fails, title matches still come back.

**Events**
- Browse upcoming events in chronological order without signing in.
- Shareable event pages with venue, times, organizer, images, and registration status (open, almost full, full).
- Organizer accounts can create events with descriptions, schedules, capacity, and images.

**Accounts**
- Sign up with an @umn.edu email, verified by a six-digit emailed code.
- Passwords hashed with bcrypt, sessions handled with expiring JWT access tokens.
- Event creation is restricted to organizer accounts on the backend.

**RSVPs**
- Register for upcoming events, with checks for duplicates, started events, and capacity.
- Registration and the RSVP count update happen in one atomic database write.
- Each registration gets a unique six-character token.

**Emails (Resend)**
- Verification codes, welcome emails, event-created confirmations, and RSVP confirmations.

**In progress:** QR code check-in.

## Architecture

- **Backend:** Express API organized into routes, controllers, services, and repositories. A request flows `Route → Middleware → Controller → Service → Repository → Prisma → PostgreSQL`.
- **Validation and auth:** Zod schemas validate request payloads, and middleware enforces JWT authentication and organizer-only access.
- **Data:** Prisma manages PostgreSQL access, with pgvector queries for semantic event search.
- **Frontend:** React and Vite app organized into pages and reusable components, with a shared Axios client that handles the API base URL and bearer-token interceptors.
- **App setup:** `app.js` builds the Express app and `server.js` connects the database and starts the server, which keeps the app testable.

## Run Locally

Install dependencies in both folders:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create `backend/.env` with `DATABASE_URL`, `JWT_SECRET`, `RESEND_API_KEY`, and your Gemini API key. Create `frontend/.env.development` with `VITE_API_URL=http://localhost:5000`.

Enable the pgvector extension in your database (`CREATE EXTENSION vector;`), then set up the database and start the backend:

```bash
cd backend
npx prisma migrate dev
node src/server.js
```

In another terminal, start the frontend:

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the API on `http://localhost:5000`.

## Docs

| Document | Description |
| --- | --- |
| [Architecture](docs/architecture.md) | How the frontend, API, and database fit together |
| [Frontend guide](docs/frontend.md) | Frontend structure, routes, and local development |
| [Database](docs/database.md) | Prisma models, migrations, and seed data |
| [Deployment](docs/deployment.md) | Frontend, backend, and CORS deployment notes |
| [API documentation](docs/api/README.md) | Available API routes |

---

Gopher Event — a product of Gopher Coding Club.
