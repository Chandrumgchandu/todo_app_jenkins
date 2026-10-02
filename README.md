# Todo Application — Full-Stack DevOps Lab

A compact full-stack Todo workload used to practice containerization, environment-based configuration, repeatable local setup, and CI/CD extension work.

## What this repo proves

- Node.js/Express API with JWT-based auth and PostgreSQL persistence.
- Static HTML/CSS/JavaScript frontend served by the backend during local use.
- Docker build context for the backend.
- `docker-compose.yml` for a reproducible local backend plus PostgreSQL stack.
- Environment variables for database and JWT configuration instead of hard-coded runtime secrets.
- Lightweight syntax checks available through `npm test`.

## Architecture

```text
Browser
  |
  v
Static frontend
  |
  v
Express API
  |
  v
PostgreSQL
```

## Repository structure

```text
.
├── backend/
│   ├── .env.example
│   ├── Dockerfile
│   ├── db.js
│   ├── middleware/auth.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── docker-compose.yml
└── README.md
```

## Run locally with Docker Compose

```bash
docker compose up --build
```

The API listens on `http://localhost:3000`. The compose file starts PostgreSQL first and waits for the database health check before starting the backend.

## Run the backend manually

```bash
cd backend
cp .env.example .env
npm ci
npm test
npm start
```

Update `.env` before running. At minimum set `POSTGRES_PASSWORD` and `JWT_SECRET` for your local environment.

## Container build

```bash
docker build -t todo-backend ./backend
```

## DevOps extension path

This repo is intentionally small, which makes it useful for practicing delivery patterns around a real application surface. Natural next steps are:

- Add database migration scripts for the `users` and `todos` tables.
- Add API tests for auth and todo routes.
- Add a CI workflow or Jenkinsfile that runs `npm ci`, `npm test`, Docker build, and image scanning.
- Add Kubernetes manifests with readiness/liveness probes, resource requests/limits, and deployment rollout checks.
- Publish images with immutable build tags rather than only `latest`.

## Portfolio note

This is a supporting lab project, not a claim of production deployment. It demonstrates practical application packaging and configuration hygiene that can support CI/CD and platform engineering exercises.
