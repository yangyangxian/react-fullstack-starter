import express from 'express';
import cookieParser from 'cookie-parser';
import { Server } from 'http';
import configs from './appConfig.js';
import logger from './utils/logger.js';
import { publicRouter, protectedRouter } from './routes/apiRouter.js';
import staticRouter from './routes/staticRouter.js';
import requestLoggerMiddleware from './middlewares/requestLoggerMiddleware.js';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';
import corsMiddleware from './middlewares/corsMiddleware.js';
import { globalAuthMiddleware } from './middlewares/authMiddleware.js';

const app = express();

// ********************************************************
// Load Middlewares
// ********************************************************
app.use(corsMiddleware); // CORS must be applied before other middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies
app.use(requestLoggerMiddleware);
// ********************************************************  
// Load Routes
// ********************************************************
app.use(publicRouter); 
app.use(globalAuthMiddleware, protectedRouter);
app.use(staticRouter); // Static file routes (SPA routing) - no auth needed

// ********************************************************
// Load Final Middleware
// ********************************************************
app.use(errorHandlingMiddleware); // Error handling must be the last middleware

// ********************************************************
// Start the server
// ********************************************************
StartServer(configs.port);

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

  const shutdown = () => {
    server.close(() => {
      logger.info('Server closed gracefully.');
      process.exit(0);
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}