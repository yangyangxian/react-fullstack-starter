import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'http';
import configs from './config.js'; 
import logger from './utils/logger.js';
import { loadApiRoutes } from './utils/loadApiRoutes.js';
import requestLogger from './middlewares/requestLogger.js';
import errorHandler from './middlewares/errorHandler.js';
import { serverRootDir, staticDistDir } from './utils/path.js';

const PORT: number = configs.port;

const app = express();

// ********************************************************
// Load Middleware
// ********************************************************
app.use(requestLogger);

// ********************************************************
// Register API routes
// ********************************************************
const __apidir = path.resolve(serverRootDir, "./api");
await loadApiRoutes(app, __apidir).catch((error) => {
  logger.error('Error registering API routes:' + error.message);
  process.exit(1);
});
logger.info(`API routes has been loaded. Visiting http://localhost:${PORT}/api/hello to test.`);

// ********************************************************
// Serve static files from the client build directory 
// For testing production mode locally
// ********************************************************
let clientBuildPath = staticDistDir;
app.use(express.static(clientBuildPath));
app.get(/^\/(?!api\/).*/, (req: Request, res: Response) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
logger.info(`Serving static files from ${clientBuildPath}`);

// ********************************************************
// Error handling middleware (must be last)
// ********************************************************
app.use(errorHandler);

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