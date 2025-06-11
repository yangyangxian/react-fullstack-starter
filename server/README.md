# Backend for React + Vite Frontend

This Express.js server serves static files from the frontend (client) build and exposes API endpoints. It uses a shared `common` package for types and DTOs.

## Usage

1. Build the shared common package:

    cd ../common
    npm install
    npm run build

2. Build the frontend:

    cd ../client
    npm install
    npm run build

3. Install backend dependencies:

    cd ../server
    npm install

4. Start the backend server:

    npm start

The server will serve the frontend from `/client/dist` and expose API routes under `/api`.

---

- Make sure to build the `common` and `client` packages before starting the backend server.
- The backend will serve `index.html` for all non-API routes (for React Router support).
- For development, use `npm run dev` to enable watch mode for both common and backend code.
- Environment variables can be set in a `.env` file in the `server` directory.
