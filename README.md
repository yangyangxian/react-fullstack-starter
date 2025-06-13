# React Fullstack App

A full stack scaffold built on Vite/React for the frontend and Express.js/Node for the backend, with a shared TypeScript package for types and DTOs.

---

## ✨ New Features

- **Directory-Based API Routing**: API routes are automatically discovered and loaded from files within the `server/src/api/` directory (e.g., `hello.ts` for `/api/hello`).
- **Client-Side Dynamic Routing**: The frontend features a dynamic routing system that automatically generates routes from `.tsx` files in `client/src/pages`. This includes support for nested routes, route grouping with `(folder)` syntax, and automatic protection of routes.
- **Shared Types**: The `common/` package provides shared types and DTOs for both client and server.

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
    cd react-fullstack
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

To configure the backend port and frontend proxy target, you can create or update `.env` files:

**For the Backend (`server/.env`):**

```env
PORT=5050  # Optional: Set a specific starting port for the backend. Defaults to 5050.
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