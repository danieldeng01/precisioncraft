import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Database connection for local development and Vercel serverless runtime.
 *
 * Preferred production variable: DATABASE_URL
 * Vercel Postgres fallback: POSTGRES_URL
 *
 * For hosted PostgreSQL providers such as Neon/Supabase/Railway, use a pooled
 * connection string with `sslmode=require` when required by the provider.
 */
const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required. Add it to .env locally and to Vercel Project Settings → Environment Variables.",
  );
}

const isLocalDatabase =
  databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

const globalForDb = globalThis as typeof globalThis & {
  __precisionCraftPostgresPool?: Pool;
};

export const pool =
  globalForDb.__precisionCraftPostgresPool ??
  new Pool({
    connectionString: databaseUrl,
    // Keep pools small for serverless; use a pooled provider URL in production.
    max: Number(process.env.DB_POOL_MAX ?? (process.env.VERCEL ? 5 : 10)),
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
    ssl: isLocalDatabase ? false : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__precisionCraftPostgresPool = pool;
}

export const db = drizzle(pool);
