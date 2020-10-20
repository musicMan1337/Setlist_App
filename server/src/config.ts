import 'dotenv/config';

export const PORT: number = Number(process.env.PORT) || 8000;
export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const CORS_ORIGIN_DEV: string = process.env.CORS_ORIGIN_DEV || '';
export const CORS_ORIGIN_PROD: string = process.env.CORS_ORIGIN_PROD || '';
export const API_TOKEN: string = process.env.API_TOKEN || '';
export const JWT_SECRET: string = process.env.JWT_SECRET || '';
export const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS);
export const DATABASE_URL: string = process.env.DATABASE_URL || '';
export const TEST_DB_URL: string = process.env.TEST_DB_URL || '';
