# Backend for React + Vite Frontend

## 🐳 Docker Deployment (Node.js Backend)

This project includes a Dockerfile for building and running the backend as a Node.js server.

> **Important:** You must run the Docker build command from the project root (not from the server directory) so the build can access the shared `common` package.

### Build the Docker Image
```sh
docker build -f server/Dockerfile -t backend .
```

### Run the Container
```sh
docker run -p 5055:5055 backend
```

- The backend API will be available at [http://localhost:5055/api/*](http://localhost:5055/api/*) by default.

---

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
