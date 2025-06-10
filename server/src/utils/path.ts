import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const serverRootDir : string = path.resolve(__dirname, '..');
export const staticDistDir : string = path.resolve(serverRootDir, '../../client/dist');