# Blogging App

A simple blogging application built with Express, Mongoose and React.

This project demonstrates a full-stack setup including user authentication, authorization, password hashing, request validations, and a basic posts system.

Features

- User registration & login (JWT)
- Protected routes and role-based access where applicable
- Create, read, update, delete posts
- Input validation and centralized error handling

Repository layout

- `backend/` — Express API server, Mongoose models, controllers, services, and route definitions
  - `src/models/` — `User.js`, `Post.js`
  - `src/routes/` — `auth.routes.js`, `post.routes.js`, `user.routes.js`
  - `src/controllers/` — request handlers for auth, posts and users
  - `src/services/` — business logic (e.g. `auth.service.js`, `post.service.js`)
  - `src/utils/` — helpers for hashing and JWT
- `frontend/` — React app (Vite)

Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

Environment
Create a `.env` file in `backend/` with at least the following variables:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWTs
- `PORT` — optional port for the backend (default often 3000 or 4000)

Local development

Backend

```bash
cd backend
npm install
# create a .env with required env vars, then
npm run dev
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Build & production

Build the frontend and serve static files from the backend (example):

```bash
cd frontend
npm run build
# copy/build output into backend public/static or serve separately
cd ../backend
npm start
```

API overview (examples)

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — obtain JWT
- `GET /api/posts` — list posts
- `GET /api/posts/:id` — get a post
- `POST /api/posts` — create post (authenticated)
- `PUT /api/posts/:id` — update post (authenticated/authorized)
- `DELETE /api/posts/:id` — delete post (authenticated/authorized)

Notes

- See `backend/src/` for validation schemas and middleware (`validations/`, `middleware/`).
- Password hashing and JWT utilities live under `backend/src/utils/`.

Contributing

- Feel free to open issues or submit pull requests. Keep changes small and focused.

License

- Check the `LICENSE` file at the repository root for licensing details.
