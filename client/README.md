# React + Vite Frontend

This is the frontend for the React Fullstack App, built with Vite and React.

## 🐳 Docker Deployment (Nginx)

This project includes a Dockerfile for building and serving the frontend as a static SPA using Nginx.

> **Important:** You must run the Docker build command from the project root (not from the client directory) so the build can access the shared `common` package.

### Build the Docker Image
```sh
docker build -f client/Dockerfile -t frontend-nginx .
```

### Run the Container
```sh
docker run -p 8080:80 frontend-nginx
```

- The app will be available at [http://localhost:8080](http://localhost:8080)
- Nginx serves the static files from the build output (`dist/`)
- The config supports client-side routing (SPA fallback to `index.html`)

## Scripts

- `npm run dev` – Start the frontend in development mode with hot reload. Proxies API requests to the backend.
- `npm run build` – Build the production-ready static files to `dist/`.
- `npm run preview` – Preview the production build locally.

## Configuration

The frontend uses standard Vite environment variables:

- **`.env`** - Development configuration (loaded by `npm run dev`)
- **`.env.production`** - Production configuration (loaded by `npm run build`)

### Environment Variables

- **`VITE_API_BASE_URL`** - API base URL
  - **Development**: Usually empty string (same origin)
  - **Production**: Your API domain (e.g., `https://api.yourapp.com`)

Vite automatically loads the correct environment file based on the build mode.

## Logging

Simple browser-compatible logging with `src/utils/logger.ts`:

```typescript
import logger from './utils/logger.js';

logger.info('Message'); 
```

## Development

- The frontend uses TypeScript and React Router.
- API requests to `/api` are proxied to the backend server (see `vite.config.js`).
- Shared types are imported from the `common` package.

## Dynamic Routing

The client application features a dynamic routing system that automatically generates routes based on the file structure within the `src/pages` directory. This approach simplifies route management and promotes a convention-over-configuration pattern.

Key features of the dynamic routing system:

- **File-based Route Generation**: Routes are created automatically for `.tsx` files found in `src/pages`.
- **Path Convention**:
  - The file path relative to `src/pages` determines the URL path. For example, `src/pages/user/ProfilePage.tsx` would map to `/user/profile`.
  - `HomePage.tsx` is a special case and maps to both `/` and `/home`.
- **Route Grouping**: Folders with names enclosed in parentheses, like `(login)`, are used for organizing page components without affecting the URL path. For example, `src/pages/(login)/LoginPage.tsx` maps to `/login`.
- **Nested Routes**: The system supports nested routes based on the directory structure. For instance, files in `src/pages/home/` will be nested under the `/home` path.
- **Authentication**: Routes are automatically wrapped with a `ProtectedRoute` component, which handles authentication logic and redirects unauthenticated users to the login page.
- **Not Found Handling**: A wildcard route (`*`) is automatically added to display a `NotFoundPage` for any unmatched paths.

The core logic for this dynamic routing can be found in `src/routes/pageRouteGenerator.ts` and is utilized within `src/App.tsx`.

## Project Structure

- `src/` – Main source code (pages, services, assets)
- `public/` – Static public assets
- `dist/` – Production build output

## Notes

- Ensure the `common` package is built before starting the frontend in development or production.
- For fullstack development, use the root `npm run dev` script to run both client and server with hot reload.
