<div align="center">
  <h1>DevFlow</h1>
  <p><strong>A community-driven Q&A platform for developers — with AI answers, voting, badges, and job discovery.</strong></p>

  <p>
    <a href="https://devflow-blue.vercel.app/">Live demo</a>
    ·
    <a href="https://github.com/iraelie251006/DevsOverFlow/issues">Report a bug</a>
    ·
    <a href="https://github.com/iraelie251006/DevsOverFlow/issues">Request a feature</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15.5-000?logo=nextdotjs&logoColor=white" alt="Next.js 15.5" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/NextAuth-v5-000?logo=auth0&logoColor=white" alt="NextAuth v5" />
    <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Gemini-API-4285F4?logo=google&logoColor=white" alt="Gemini API" />
    <img src="https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white" alt="Docker" />
  </p>
</div>

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Features](#features)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Docker](#docker)
- [CI/CD](#cicd)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [Credits](#credits)

---

## Overview

DevFlow is a Stack Overflow–style community platform where developers can ask questions, receive answers (from other users or AI), vote on quality content, save collections, browse jobs, and earn badges. It's built with the latest Next.js App Router features — Server Components, Server Actions, streaming, and route caching — on top of MongoDB and NextAuth v5.

## Tech stack

**Runtime & framework**
- [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Turbopack dev)
- [React 19 RC](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)

**Data & auth**
- [MongoDB](https://www.mongodb.com/) + [Mongoose 8](https://mongoosejs.com/)
- [NextAuth v5 (Auth.js)](https://authjs.dev/) — Credentials, GitHub, Google
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for password hashing

**UI**
- [Tailwind CSS 3](https://tailwindcss.com/) + [tailwind-merge](https://github.com/dcastro/tailwind-merge)
- [shadcn/ui](https://ui.shadcn.com/) + [Radix primitives](https://www.radix-ui.com/)
- [MDX Editor](https://mdxeditor.dev/) with `bright` for syntax highlighting
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

**AI & integrations**
- [Google Gemini API](https://ai.google.dev/) for AI-generated answers
- [JSearch RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) for job listings

**Validation & tooling**
- [Zod](https://zod.dev/) for schema validation
- [react-hook-form](https://react-hook-form.com/) for form state
- [Pino](https://getpino.io/) for structured logging

## Features

- **Authentication** — Email/password, Google, and GitHub sign-in via NextAuth v5.
- **Ask & answer** — Rich MDX editor with code blocks, images, and dark-mode.
- **AI answers** — Generate an answer with Gemini when the community hasn't replied yet.
- **Voting** — Upvote/downvote questions and answers with per-user state.
- **Collections** — Bookmark questions into filterable, searchable collections.
- **Recommendations** — Personalized question feed based on your interaction history and tags.
- **Global search** — Cross-model search over questions, answers, users, and tags.
- **Tags** — Browse questions by tag with counts, filters, and pagination.
- **Community** — Discover users with search, filters, and pagination.
- **Profile & badges** — Track your questions, answers, tags, and gamified badges (bronze/silver/gold).
- **Job finder** — Search developer jobs by title, city, and country via JSearch.
- **Interaction tracking** — Views, votes, saves, and posts feed into the recommendation engine.
- **Auth & ownership** — Edit/delete guarded by ownership checks and Zod validation.
- **Responsive** — Works on desktop, tablet, and mobile.

## Getting started

**Prerequisites**
- Node.js 20+
- npm 10+
- A MongoDB instance (local or Atlas)
- OAuth apps on [GitHub](https://github.com/settings/developers) and [Google](https://console.cloud.google.com/apis/credentials) (optional — only if you enable those providers)
- API keys for [Gemini](https://aistudio.google.com/app/apikey) and [JSearch RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)

**Clone and install**
```bash
git clone https://github.com/iraelie251006/DevsOverFlow.git
cd DevsOverFlow
npm install
```

**Configure env vars** — copy the block from [Environment variables](#environment-variables) into a `.env.local` file and fill in the values.

**Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` in the project root:

```env
# Database
MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>/devflow"

# NextAuth
AUTH_SECRET="<openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"

# OAuth providers
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# AI (Gemini)
GEMINI_API_KEY=""

# Jobs (JSearch on RapidAPI)
NEXT_PUBLIC_RAPID_API_KEY=""

# Optional — override the internal API base URL
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"

# Optional — pino log level (default: info)
LOG_LEVEL="info"
```

Generate `AUTH_SECRET` with:
```bash
openssl rand -base64 32
```

## Scripts

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start Turbopack dev server on `:3000`     |
| `npm run build` | Production build (standalone output)      |
| `npm run start` | Run the built app                         |
| `npm run lint`  | ESLint (flat config, Next 15 + Tailwind)  |

## Docker

The repo ships a multi-stage Dockerfile that produces a ~150 MB image running as a non-root user, using Next.js's standalone output.

**Build & run locally**
```bash
docker build -t devflow:local .
docker run --rm -p 3000:3000 --env-file .env.local devflow:local
```

The container listens on `:3000` and includes a `HEALTHCHECK` that pings the root path.

## CI/CD

`.github/workflows/ci-cd.yml` runs on every push and PR:

1. **`test` job** — typecheck (`tsc --noEmit`), lint (non-blocking), and production build.
2. **`build-and-push` job** — on pushes to `main` (or `v*.*.*` tags), builds a linux/amd64 image with Buildx and pushes to Docker Hub with cache-from/to `type=gha`.

**Image tags produced**
- `latest` (default branch only)
- `main` (branch name)
- `sha-<commit>`
- `v1.2.3` (from git tags)

**Required GitHub Secrets** (Settings → Secrets and variables → Actions):
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN` — [Docker Hub access token](https://hub.docker.com/settings/security) with Read/Write/Delete scope

## Project structure

```
devflow/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Sign-in, sign-up
│   ├── (root)/             # Main app routes (home, questions, tags, jobs, profile…)
│   └── api/                # Route handlers (auth, accounts, users, AI answers)
├── auth.ts                 # NextAuth v5 config
├── middleware.ts           # Auth middleware
├── components/             # UI components (shadcn/ui in components/ui)
├── constants/              # Routes, tech map, states
├── context/                # Theme provider
├── database/               # Mongoose models (User, Question, Answer, Vote, …)
├── hooks/                  # Custom hooks (use-toast, etc.)
├── lib/
│   ├── actions/            # Server actions (questions, answers, votes, …)
│   ├── handlers/           # action / error / fetch wrappers
│   ├── validations.ts      # Zod schemas
│   ├── mongoose.ts         # Cached DB connection
│   └── utils.ts            # Shared helpers
├── types/                  # Shared TS types
├── Dockerfile              # Multi-stage production image
├── .dockerignore
└── .github/workflows/      # CI/CD pipeline
```

## Contributing

Contributions are welcome. To propose a change:

1. Fork and create a branch off `main`: `git checkout -b feat/my-change`
2. Run `npm run lint` and `npx tsc --noEmit` before committing.
3. Open a PR with a short description of the change and any screenshots for UI updates.

## Credits

Originally built while following the [JSM Ultimate Next.js Course](https://www.jsmastery.pro/ultimate-next-course), then extended with additional features, a Dockerized build, and a Docker Hub CI/CD pipeline.

Maintained by [@iraelie251006](https://github.com/iraelie251006).
