# Backend for React + Vite Frontend

This Express.js server serves the static files from the frontend build and listens on a single port (default: 3000).

## Usage

1. Build the frontend:

    cd ../frontend
    npm run build

2. Install backend dependencies:

    cd ../backend
    npm install

3. Start the backend server:

    npm start

The server will serve the frontend from `/frontend/dist`.

---

- Make sure to build the frontend before starting the backend server.
- The backend will serve `index.html` for all routes (for React Router support).
