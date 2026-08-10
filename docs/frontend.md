# Frontend guide

The frontend is a React single-page application built with Vite. Its source lives in `frontend/` and it communicates with the Express API through the shared Axios client in `frontend/src/api/axios.js`.

## Run locally

From the `frontend/` directory, install dependencies and start Vite:

```bash
npm install
npm run dev
```

Create `frontend/.env.development` with the API origin:

```env
VITE_API_URL=http://localhost:5000
```

Use `npm run build` to create a production build and `npm run lint` to run ESLint.

## Project structure

| Location | Purpose |
| --- | --- |
| `src/App.jsx` | Application routes and top-level providers |
| `src/pages/` | Route-level components; these fetch data and manage page state |
| `src/components/` | Reusable presentational components and feature UI |
| `src/api/axios.js` | Axios instance configured with `VITE_API_URL` |
| `src/context/ToastContext.jsx` | App-wide toast notifications |
| `src/styles/global.css` | Shared global styles and design tokens |

The event list, event detail, create-event, login, and email-verification pages use a container/view pattern: the page owns requests and state, while its paired component in `src/components/` renders the interface.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/signup`, `/verify-email`, `/login` | Account creation and sign-in flow |
| `/events` | Event directory |
| `/events/create` | Event creation form |
| `/events/:publicId` | Event detail page |
| `/ticket-designs` | Event-pass design page |
| `/check-in` | Pass-scanner/check-in page |

`/event-detail-preview` and `/organizer-preview` are static design-preview routes. They use placeholder content and external images, and are not connected to API data or production user flows yet.

## Authentication

Login and OTP verification store the returned access token in `localStorage` under `token`. The Axios authorization interceptor is currently commented out in `src/api/axios.js`; enable it before relying on protected frontend requests such as event creation.
