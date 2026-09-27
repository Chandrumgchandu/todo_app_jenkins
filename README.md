# Todo Application — Full-Stack Containerization Lab

A small full-stack Todo application used to practice application packaging and DevOps workflows.

## Architecture

```text
Browser
  |
  v
Static frontend (HTML / CSS / JavaScript)
  |
  v
Node.js backend
  |
  v
Application data layer
```

## Repository structure

```text
.
├── backend/
│   ├── Dockerfile
│   ├── db.js
│   ├── middleware/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
└── README.md
```

## DevOps focus

- Separates frontend and backend concerns.
- Includes a backend Dockerfile and Docker build context controls.
- Keeps Node.js dependencies reproducible with `package-lock.json`.
- Provides a compact application suitable for CI/CD, container, reverse-proxy, and deployment exercises.

## Run the backend

```bash
cd backend
npm ci
npm start
```

Review `backend/package.json` and the application configuration before running it in a new environment.

## Container build

```bash
docker build -t todo-backend ./backend
```

## Frontend

The frontend is plain HTML, CSS, and JavaScript under `frontend/`. It can be served by a static web server or incorporated into a containerized deployment.

## Next engineering improvements

Natural extensions for this lab include a Jenkins or GitHub Actions pipeline, container registry publishing, Kubernetes manifests, environment-based configuration, automated tests, image scanning, and deployment verification.

## Purpose

This repository is retained as a focused software-and-DevOps practice project: a simple application surface that can be used to exercise build, packaging, automation, and deployment patterns.
