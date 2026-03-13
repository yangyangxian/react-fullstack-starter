# AGENTS.md

## Scope

This file applies to the entire repository.

## Project Summary

This repository is a TypeScript monorepo with three workspace packages:

- `client/`: React 19 + Vite 7 frontend.
- `server/`: Express 5 + Node.js backend.
- `common/`: shared DTOs, response types, and enums used by both client and server.

The project is designed as a single fullstack app:

- In development, the client runs on Vite dev server and proxies `/api` to the backend.
- In production, the backend serves both the API and the built frontend from the same process.

## Core Stack

- Frontend: React 19, React Router, TypeScript, Vite, Tailwind CSS 4.
- Backend: Node.js, Express 5, TypeScript, JWT auth, cookie-parser, optional CORS, Winston logging.
- Shared package: TypeScript build output consumed as `@fullstack/common`.
- Tooling: npm workspaces, `concurrently`, `tsx`, TypeScript compiler, Docker multi-stage build.

## Monorepo Layout

- `package.json`: workspace orchestration and root scripts.
- `client/src/pages/`: page components used for automatic route generation.
- `client/src/routes/`: route generation and route mapping logic.
- `client/src/providers/`: app-wide providers such as authentication state.
- `server/src/api/`: API modules discovered automatically at startup.
- `server/src/middlewares/`: auth, logging, CORS, and error handling middleware.
- `server/src/services/`: service layer. `UserService` is currently an in-memory demo implementation.
- `common/src/`: shared request/response types and enums.

## How Routing Works

### Frontend

The frontend uses file-based route generation instead of a manually maintained route table.

- Route source: `client/src/pages/**/*.tsx`.
- Generator: `client/src/routes/pageRouteGenerator.ts`.
- Folder names wrapped in parentheses, such as `(demo)` or `(login)`, are grouping folders and are removed from the public URL.
- `routeConfig.ts` contains explicit public routes and route remapping. At the moment `/` is mapped to `/home`.
- `App.tsx` wraps generated routes with `ProtectedRoute`, so route accessibility is controlled centrally.

When adding a new page, prefer placing it under `client/src/pages/` and letting the generator expose the route.

### Backend

The backend uses API module auto-discovery.

- Route source: `server/src/api/*.ts`.
- Loader: `server/src/routes/apiRouter.ts`.
- Each API module may export `publicRouter`, `protectedRouter`, or both.
- Public routers are mounted directly.
- Protected routers are mounted after `app.use("/api", globalAuthMiddleware)`.

When adding an endpoint, prefer creating a new module under `server/src/api/` and exporting the correct router rather than editing a central route list.

## Authentication Model

- Auth is JWT-based.
- The primary browser flow stores the token in an HTTP-only cookie named `auth-token`.
- `server/src/middlewares/authMiddleware.ts` also accepts `Authorization: Bearer <token>` for API clients.
- `client/src/providers/AuthProvider.tsx` restores auth state by calling `/api/auth/me` on startup.
- `client/src/components/ProtectedRoute.tsx` enforces login for non-public routes.

## Shared Contract Rules

- Shared DTOs and response types belong in `common/src/`.
- If a client-server payload changes, update `common/` first, then adapt both sides.
- Import shared contracts through `@fullstack/common` instead of redefining local copies.

Note: the current folder name is `common/src/emuns/`. Treat it as an existing project convention unless you are doing an intentional repo-wide rename.

## Runtime And Build Notes

Important root scripts:

- `npm run install`: install dependencies for all three packages.
- `npm run dev`: build `common`, then run common watch, client dev server, and server dev process together.
- `npm run build`: build `common`, then client, then server.
- `npm start`: production build plus server start.

Package-level behavior:

- Client dev server proxies `/api` to `http://localhost:5050`.
- Server defaults to port `5050` and increments if the port is occupied.
- CORS is disabled by default and should only be enabled for split-origin deployments.
- The root Dockerfile builds `common`, `client`, and `server` in separate stages and serves the built frontend from the backend container.

## Project Conventions For Changes

- Prefer minimal, local changes that preserve the existing auto-discovery architecture.
- Do not replace file-based routing with a manual route registry unless the task explicitly requires it.
- Do not add duplicate DTO or error-code definitions outside `common/`.
- Keep backend auth behavior consistent with cookie-based browser sessions.
- Remember that `server/src/services/UserService.ts` is demo-grade in-memory storage. If a task assumes persistence, call that out explicitly.

## Skill Usage

Use a skill when the work is a reusable, multi-step workflow rather than a one-off code change.

Examples:

- codebase onboarding
- release checklist
- API module scaffolding
- auth flow extension
- deployment workflow

For this repository, keep project-specific skills under `.github/skills/` so Copilot can discover them directly inside the workspace.

- Preferred location: `.github/skills/<skill-name>/SKILL.md`
- Keep any skill assets for that workflow inside the same skill directory.
- Treat `.github/skills/` as the source of truth for project-specific skills.

## When Creating New Features

Use these extension points first:

- New frontend page: add a page component under `client/src/pages/`.
- New frontend route alias or public-path rule: update `client/src/routes/routeConfig.ts`.
- New backend endpoint: add a module under `server/src/api/` exporting `publicRouter` or `protectedRouter`.
- New shared payload shape: update `common/src/` and rebuild the common package.
- New auth-aware UI behavior: start with `AuthProvider` and `ProtectedRoute` before adding ad hoc checks.

## Known Project Facts

- The current auth flow is suitable for demos and local development.
- `UserService` currently stores users in memory; server restarts reset the data.
- Production SPA fallback is handled by `server/src/routes/staticRouter.ts`.
- Some existing README text is slightly stale; prefer code over prose when they differ.