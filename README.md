
# PortalOne Fullstack App

## How to Run

1. Install dependencies (first time only):
   ```powershell
   npm install --prefix client
   npm install --prefix server
   ```

2. Build both client and server, and start the server (from the project root):
   ```powershell
   npm start
   ```
   - This will build the React app in `client/` and the TypeScript server in `server/`, then start the server on http://localhost:3000
   - The server will serve the static files from `client/dist` and handle API requests under `/api`.

---

## Development Workflow

- For fullstack development with hot reload (from project root):
  ```powershell
  npm run dev
  ```
  - This runs both the React client (on port 5173) and the Node/Express server (on port 3000) with hot reload.
  - The client is configured to proxy `/api` requests to the backend using `client/vite.config.js`.

- For backend-only development with hot reload:
  ```powershell
  npm run dev:server --prefix server
  ```

- For client-only development with hot reload:
  ```powershell
  npm run dev --prefix client
  ```

---

## Project Structure

- `client/` - React + Vite frontend (static files built to `client/dist`)
- `server/` - Express + TypeScript backend (serves API under `/api` and static files for production)

---

## API & Routing
- All backend API endpoints should be defined under `/api` in `server/src/index.ts`.
- All other routes are handled by the React app (client-side routing).
- During development, API requests from the client are proxied to the backend.

---

## Production
- Always build the client before starting the server for production.
- The server will serve the static frontend from `client/dist` and handle API requests on the same port.
