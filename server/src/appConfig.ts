import dotenv from 'dotenv';
import fs from 'fs';
/**
 * Handles environment variable loading and provides type-safe configuration access
 */
class AppConfig {
  public readonly port: number;
  public readonly dbUrl: string;
  public readonly envMode: string;
  public readonly corsEnabled: boolean;
  public readonly corsOrigins: string[];
  public readonly staticDir: string;
  public readonly jwtSecret: string;

  constructor() {
    // Load environment variables
    this.loadEnvironmentFiles();
    
    // Initialize configuration properties
    this.port = parseInt(this.getEnv('PORT', '5050'), 10);
    this.dbUrl = this.getEnv('DATABASE_URL', '');
    this.envMode = this.getEnv('NODE_ENV', 'development');
    this.corsEnabled = this.getEnv('CORS_ENABLED', 'false').toLowerCase() === 'true';
    this.corsOrigins = this.getEnv('CORS_ORIGINS', 'http://localhost:5173,http://localhost:3000')
      .split(',')
      .map(origin => origin.trim());
    this.staticDir = this.getEnv('STATIC_DIR', '');
    this.jwtSecret = this.getEnv('JWT_SECRET');
  }

  /**
   * Load environment files in the correct order
   */
  private loadEnvironmentFiles(): void {
    // Load default .env first
    dotenv.config({ path: '.env' });
    
    // Load env-specific file if it exists
    const envFile = `.env.${this.getEnv('NODE_ENV', 'development')}`;
    const envFile2 = `server/.env.${this.getEnv('NODE_ENV', 'development')}`; // For monorepo
    
    if (fs.existsSync(envFile)) {
      dotenv.config({ path: envFile, override: true });
    } else if (fs.existsSync(envFile2)) {
      dotenv.config({ path: envFile2, override: true });
    } else {
      console.log(`Environment file ${envFile} not found`);
    }
  }

  /**
   * Get environment variable with optional fallback
   */
  private getEnv(key: string, fallback?: string): string {
    const value = process.env[key];
    if (value !== undefined) return value;
    if (fallback !== undefined) return fallback;
    
    throw new Error(`Missing required env var: ${key}`);
  }
}

// Create the singleton instance at module level
const appConfig = new AppConfig();

// Export the singleton instance
export default appConfig; 