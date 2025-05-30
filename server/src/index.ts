import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadApiRoutes } from './loadApiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Register API routes, then start the server
await loadApiRoutes(app, __dirname).catch((error) => {
  console.error('Error registering API routes:', error);
  process.exit(1);
});

// Serve static files from the client build directory
const clientBuildPath = path.join(__dirname, '../../../../client/dist');
console.log(`Server directory: ${clientBuildPath}`);
app.use(express.static(clientBuildPath));
app.get(/^\/(?!api\/).*/, (req: Request, res: Response) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown on SIGINT/SIGTERM (Ctrl+C or terminal kill)
const shutdown = () => {
  server.close(() => {
    console.log('Server closed gracefully.');
    process.exit(0);
  });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
