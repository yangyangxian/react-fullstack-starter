import path from 'path'
import { fileURLToPath } from 'url';
import logger from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const serverRootDir : string = path.resolve(__dirname, '..');
export const staticDistDir : string = path.resolve(serverRootDir, '../../client/dist');

logger.info("Server root directory is " + serverRootDir);