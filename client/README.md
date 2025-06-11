# React + Vite Frontend

This is the frontend for the React Fullstack App, built with Vite and React.

## Scripts

- `npm run dev` – Start the frontend in development mode with hot reload. Proxies API requests to the backend.
- `npm run build` – Build the production-ready static files to `dist/`.
- `npm run preview` – Preview the production build locally.

## Development

- The frontend uses TypeScript and React Router.
- API requests to `/api` are proxied to the backend server (see `vite.config.js`).
- Shared types are imported from the `common` package.

## Project Structure

- `src/` – Main source code (pages, services, assets)
- `public/` – Static public assets
- `dist/` – Production build output

## Notes

- Ensure the `common` package is built before starting the frontend in development or production.
- For fullstack development, use the root `npm run dev` script to run both client and server with hot reload.
