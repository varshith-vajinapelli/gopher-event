# Gopher Event

Gopher Event is a campus event platform for finding, creating, and registering for events, specifically built for the University of Minnesota.


# Hero Features
1. Semantic Search: Search understands the user's intent without requiring exact keyword matches. It uses vector embeddings to find and return events that are most relevant to the user's query.
2. (**In Progress**) QR Code Check-In: Registered users receive a QR code for event check-in. Event organizers can scan these QR codes to quickly verify and check attendees into the event.

# Project Structure

The project has two apps:

| App | Location | Purpose |
| --- | --- | --- |
| Frontend | `frontend/` | React and Vite web app |
| Backend | `backend/` | Express API and Prisma database layer |

## Run locally

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

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

## Docs

| Document | Description |
| --- | --- |
| [Architecture](docs/architecture.md) | How the frontend, API, and database fit together |
| [Frontend guide](docs/frontend.md) | Frontend structure, routes, and local development |
| [Database](docs/database.md) | Prisma models, migrations, and seed data |
| [Deployment](docs/deployment.md) | Frontend, backend, and CORS deployment notes |
| [API documentation](docs/api/README.md) | Available API routes|
