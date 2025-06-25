# React Fullstack Starter

A full stack scaffold built on Vite/React for the frontend and Express.js/Node for the backend, with a shared TypeScript package for types and DTOs.

---

## ✨ Key Features

- **Directory-Based API Routing**: API routes are automatically discovered and loaded from files within the `server/src/api/` directory (e.g., `hello.ts` for `/api/hello`).
- **Client-Side Dynamic Routing**: The frontend features a dynamic routing system that automatically generates routes from `.tsx` files in `client/src/pages`. This includes support for nested routes, route grouping with `(folder)` syntax, and automatic protection of routes.
- **Shared Types & DTOs**: The `common/` package provides shared types and Data Transfer Objects (e.g., `UserResDto`, `HelloResDto`) for type-safe communication between client and server.
- **Database Integration (Backend)**:
  - A minimal database access utility (`server/src/utils/databaseAccess.ts`) provides a centralized `executeQuery` function.
- **Out-of-the-Box Backend Middleware**:
  - Includes pre-configured middleware for essential backend tasks such as:
    - Centralized error handling (`server/src/middlewares/errorHandlingMiddleware.ts`) for consistent JSON error responses.
    - Incoming request logging (`server/src/middlewares/requestLoggerMiddleware.ts`).

---

## ⚙️ Technology Stack

- **Frontend**:
  - React
  - Vite
  - TypeScript
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
  - TypeScript
  - Winston
- **Shared Code**:
  - TypeScript
- **Build & Package Management**:
  - npm
  - Vite

---

## How to Run

1. **Install dependencies (first time only):**

   ```powershell
   npm run install:all
   ```

   *(This runs `npm install` for the client, server, and common packages.)*

2. **Build all packages and start the server (from the project root):**

   ```powershell
   npm start
   ```

   - This will build the `common` package, the React app in `client/`, and the Node server in `server/`, then start the server on `http://localhost:5050` (or the next available port).
   - The server will serve static files from `client/dist` and handle API requests under `/api`.

---

## Development Workflow

- **Fullstack development with hot reload:**

  ```powershell
  npm run dev
  ```

  - Runs the React client (on port 5173), the Node/Express server (on port 5050 or next available), and watches the `common` package for changes.
  - The client proxies `/api` requests to the backend using `client/vite.config.js`.

- **Backend-only development:**

  ```powershell
  npm run dev:server
  ```

- **Client-only development:**

  ```powershell
  npm run dev:client
  ```

---

## Project Structure

- `client/` - React + Vite frontend (static files built to `client/dist`)
- `server/` - Express + TypeScript backend (serves API under `/api` and static files for production)
- `common/` - Shared TypeScript types and DTOs

---

## API & Routing

- Backend API endpoints are defined as files under `server/src/api/` (e.g., `server/src/api/hello.ts` defines `/api/hello`).
- All other routes are handled by the React app (client-side routing).
- During development, API requests from the client are proxied to the backend.

---

## Configuration

### Environment Variables

For backend configuration, such as port numbers and database connection strings, this project uses `.env` files located in the `server/` directory.

**Managing Sensitive Data (e.g., `DATABASE_URL`):**

- Create a `server/.env.development` (for development) or `server/.env.production` (for production) file for your environment-specific settings. These files will contain your actual `DATABASE_URL` and other sensitive information.
- **Crucially, ensure these environment-specific files (e.g., `server/.env.development`, `server/.env.production` if they contain secrets) are listed in your `.gitignore` file to prevent committing secrets.**
- The `server/.env` file should be used for base configuration, default values, or as a template. It can be committed to version control if it does **not** contain any secrets.

**Loading Order:**

The application loads environment variables in the following order:

1. **`server/.env`**: This file is loaded first and should contain your base configuration or default values.
2. **`server/.env.development` OR `server/.env.production`**: Depending on the `NODE_ENV` (e.g., 'development' or 'production'), the corresponding file is loaded next. Variables in these files will override any identical variables defined in `server/.env`.

   For example, if `NODE_ENV` is 'development', `server/.env.development` is loaded after `server/.env`. If `NODE_ENV` is 'production', `server/.env.production` is loaded after `server/.env`.

   It is recommended to place sensitive information like database credentials in these environment-specific files and ensure they are added to `.gitignore`.

### CORS Configuration

CORS is **disabled by default** - frontend and backend are served from the same origin.

**Enable CORS only if:** you're deploying frontend and backend to different domains/ports.

**Environment Variables:**

- `CORS_ENABLED=true` - Enable CORS
- `CORS_ORIGINS=https://myapp.com,https://myapp.netlify.app` - Allowed origins (comma-separated)

```bash
# Single server (default) - no CORS needed
CORS_ENABLED=false

# Separate deployments - enable CORS
CORS_ENABLED=true
CORS_ORIGINS=https://myapp.vercel.com
```

---

## Production

- Always build the `common` and `client` packages before starting the server for production.
- The server will serve the static frontend from `client/dist` and handle API requests on the same port.

---

## Troubleshooting

- **Port Conflicts (`EADDRINUSE`)**: The backend will try the next available port if the default or specified port is in use. Check the server logs for the actual port in use.
- **Permission Denied (`EACCES`)**: If you encounter permission errors when running npm commands, you might need to fix file ownership. From your project root, run:

  ```powershell
  icacls . /grant %USERNAME%:F /T
  ```

  (This command grants full control to your user for all files and directories in the current directory and its subdirectories.)

## 🐳 Docker Deployment (All-in-One)

This project uses a single, all-in-one Dockerfile at the root to build and deploy both the frontend and backend together. The backend serves the frontend on a single port (default: 5055).

### Build & Run
```sh
docker build -t fullstack-app .
docker run -p 5055:5055 fullstack-app
```

- The app will be available at [http://localhost:5055](http://localhost:5055)
- Both the frontend and backend are served from this port

---

## 🐳 How Multi-Stage Docker Builds Work in This Project

This project uses a **multi-stage Docker build** to efficiently build and package the fullstack application. Here's how it works:

### Multi-Stage Build Process
- **Stage 1: Build common** – Compiles the shared code used by both client and server.
- **Stage 2: Build client** – Builds the frontend using the compiled common code.
- **Stage 3: Build server** – Builds the backend using the compiled common code.
- **Stage 4: Production image** – Copies only the built output (and production dependencies) from previous stages into a clean, minimal image for deployment.