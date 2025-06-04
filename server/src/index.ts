import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadApiRoutes } from './loadApiRoutes.js';
import fs from 'fs';
import { Server } from 'http';
import configs from './config.js'; 
import logger from './utils/logger.js';
import requestLogger from './middleware/requestLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT: number = configs.port;

const app = express();

// ********************************************************
// Load Middleware
// ********************************************************
app.use(requestLogger);

// ********************************************************
// Register API routes
// ********************************************************
await loadApiRoutes(app, __dirname).catch((error) => {
  logger.error('Error registering API routes:', error);
  process.exit(1);
});

// ********************************************************
// Serve static files from the client build directory 
// For testing production mode locally
// ********************************************************
let clientBuildPath = path.resolve(__dirname, '../../client/dist');
if (!fs.existsSync(path.join(clientBuildPath, 'index.html'))) {
  clientBuildPath = path.resolve(__dirname, '../../../../client/dist');
}
app.use(express.static(clientBuildPath));
app.get(/^\/(?!api\/).*/, (req: Request, res: Response) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});


// ********************************************************
// Start the server
// ********************************************************
StartServer(PORT);

// ********************************************************
// Private functions
// ********************************************************
function StartServer(port: number): void {
  const server: Server = app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port} in ${configs.envMode} mode.`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      logger.warn(`Port ${port} is in use. Trying port ${port + 1}...`);
      StartServer(port + 1);
    } else {
      logger.error('Server error:', err);
    }
  });

  // Graceful shutdown on SIGINT/SIGTERM (Ctrl+C or terminal kill)
  const shutdown = () => {
    server.close(() => {
      logger.info('Server closed gracefully.');
      process.exit(0);
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}