// src/config/constants.ts
import dotenv from 'dotenv';
import path from 'path';

// Load .env (chỉ load 1 lần khi import file này)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function getEnvVar(name: string, required = true): string {
  const val = process.env[name];
  if (required && (!val || val.trim() === '')) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return (val ?? '').trim();
}

export const TEST_EMAIL = getEnvVar('GMAIL_USER');
export const TEST_PASSWORD = getEnvVar('GMAIL_PASS');
export const BASE_URL = process.env.BASE_URL ?? 'https://remitano.com/vn';
