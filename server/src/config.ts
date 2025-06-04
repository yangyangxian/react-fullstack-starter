import dotenv from 'dotenv';
import fs from 'fs';

//try to get variables from process.env
const GetEnv = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (value !== undefined) return value;
  if (fallback !== undefined) return fallback;
  
  throw new Error(`Missing required env var: ${key}`);
};

console.log('NODE_ENV (before dotenv.config()):', process.env.NODE_ENV);
// Load default .env first
dotenv.config({ path: '.env' });
// Load env-specific file if it exists
const envFile = `.env.${GetEnv('NODE_ENV', 'development')}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}
console.log('NODE_ENV (after dotenv.config()):', process.env.NODE_ENV);
const configs = {
  port: parseInt(GetEnv('PORT', '5050'), 10),
  dbUrl: GetEnv('DATABASE_URL', 'mongodb://localhost:27017/my_database'),
  envMode: GetEnv('NODE_ENV', 'development'),
};

export default configs; 