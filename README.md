# Gopher Event

A campus event platform for finding, creating, and registering for events, built specifically for the University of Minnesota.

[![Live Site](https://img.shields.io/badge/Live_Site-gopherevent.com-7A0019?style=for-the-badge)](https://gopherevent.com)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

Deployed on AWS EC2 + Cloudflare. Semantic search is powered by pgvector.

## Demo

https://github.com/user-attachments/assets/844337b0-0878-42d3-b45e-ad50402dce70

Semantic search finds events by meaning, not keywords. Searching "relax and unwind" surfaces a yoga event even though no words in the title match.

## Features

- **Semantic Search:** understands the user's intent without exact keyword matches, using vector embeddings (pgvector) to return the most relevant events.
- JWT authentication
- Event creation and management
- RSVP system
- Email notifications via Resend

## Roadmap

- **QR Code Check-In (in progress):** Registered users receive a QR code for event check-in, and organizers can scan it to verify and check attendees in.

## Run Locally

Install dependencies in both folders:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create `backend/.env` with `DATABASE_URL`, `JWT_SECRET`, and `RESEND_API_KEY`. Create `frontend/.env.development` with `VITE_API_URL=http://localhost:5000`.

Set up the database, then start the backend:

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

The frontend (`frontend/`) runs on `http://localhost:5173` and the API (`backend/`) runs on `http://localhost:5000`.

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
