import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadApiRoutes } from './loadApiRoutes.js';
import fs from 'fs';
import { Server } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5050;

// Register API routes, then start the server
await loadApiRoutes(app, __dirname).catch((error) => {
  console.error('Error registering API routes:', error);
  process.exit(1);
});

// Serve static files from the client build directory
let clientBuildPath = path.resolve(__dirname, '../../client/dist');
if (!fs.existsSync(path.join(clientBuildPath, 'index.html'))) {
  clientBuildPath = path.resolve(__dirname, '../../../../client/dist');
}

app.use(express.static(clientBuildPath));
app.get(/^\/(?!api\/).*/, (req: Request, res: Response) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

StartServer(PORT);

function StartServer(port: number): void {
  const server: Server = app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is in use. Trying port ${port + 1}...`);
      StartServer(port + 1); // Retry with next port
    } else {
      console.error('❌ Server error:', err);
    }
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
}