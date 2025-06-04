import dotenv from 'dotenv';
import fs from 'fs';

//try to get variables from process.env
const GetEnv = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (value !== undefined) return value;
  if (fallback !== undefined) return fallback;
  
  throw new Error(`Missing required env var: ${key}`);
};

// Load default .env first
dotenv.config({ path: '.env' });
// Load env-specific file if it exists
const envFile = `.env.${GetEnv('NODE_ENV', 'development')}`;
const envFile2 = `server/.env.${GetEnv('NODE_ENV', 'development')}`;   //this monorepo will run from the root dir
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile , override: true });
} else if (fs.existsSync(envFile2)) {
  dotenv.config({ path: envFile2 , override: true });
} else {
  console.log(`Environment file ${envFile} not found`);
}

const configs = {
  port: parseInt(GetEnv('PORT', '5050'), 10),
  dbUrl: GetEnv('DATABASE_URL', 'mongodb://localhost:27017/my_database'),
  envMode: GetEnv('NODE_ENV', 'development'),
};

export default configs; 