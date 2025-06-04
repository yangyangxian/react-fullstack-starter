# React Fullstack App

A full stack scaffold built on vite/react for frontend site and express.js based node server for backend server.

---

## ✨ New Features
- **Directory-Based API Routing**: API routes are now automatically discovered and loaded from files within the `server/src/api/` directory (e.g., `hello.ts` for `/api/hello`).

---

## How to Run

1.  **Install dependencies (first time only):**
    ```powershell
    cd PortalOne
    npm run install:all
    ```
    *(This runs `npm install` for both the client, server and root directories.)*

2.  **Build both client and server, and start the server (from the project root):**
    ```powershell
    npm start
    ```
    -   This will build the React app in `client/` and the TypeScript server in `server/`, then start the server on `http://localhost:5050` (or the next available port if `5050` is in use).
    -   The server will serve the static files from `client/dist` and handle API requests under `/api`.

---

## Development Workflow

-   **For fullstack development with hot reload (from project root):**
    ```powershell
    npm run dev
    ```
    -   This runs both the React client (on port 5173) and the Node/Express server (on port `5050` or the next available port) with hot reload.
    -   The client is configured to proxy `/api` requests to the backend using `client/vite.config.js`.

-   **For backend-only development with hot reload:**
    ```powershell
    npm run dev:server
    ```

-   **For client-only development with hot reload:**
    ```powershell
    npm run dev:client
    ```

---

## Project Structure

-   `client/` - React + Vite frontend (static files built to `client/dist`)
-   `server/` - Express + TypeScript backend (serves API under `/api` and static files for production)

---

## API & Routing
-   Backend API endpoints are now defined as files under `server/src/api/` (e.g., `server/src/api/hello.ts` defines `/api/hello`).
-   All other routes are handled by the React app (client-side routing).
-   During development, API requests from the client are proxied to the backend.

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
-   Always build the client before starting the server for production.
-   The server will serve the static frontend from `client/dist` and handle API requests on the same port.

---

## Troubleshooting
-   **Port Conflicts (`EADDRINUSE`)**: The backend is designed to automatically try the next available port if the default or specified port is in use. Check the server for the actual port in use.
-   **Permission Denied (`EACCES`)**: If you encounter permission errors when running npm commands (e.g., modifying `package-lock.json`), you might need to fix file ownership. From your project root, run:
    ```bash
    sudo chown -R $(whoami) .
    ```
    (This command changes the ownership of all files and directories in the current directory and its subdirectories to your current user.)