import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Lazy database connection for local development and Vercel serverless runtime.
 *
 * Why lazy? Next/Vercel imports route modules during `next build` while
 * collecting page data. If the database connection throws at module import
 * time, preview deployments fail before the app can even start. By resolving
 * the URL only when a request actually touches the DB, builds succeed and
 * runtime errors are returned cleanly from the API.
 */

function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
}

function isLocalDatabase(databaseUrl: string) {
  return databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");
}

const globalForDb = globalThis as typeof globalThis & {
  __precisionCraftPostgresPool?: Pool;
  __precisionCraftDrizzle?: ReturnType<typeof drizzle>;
};

export function getPool() {
  if (globalForDb.__precisionCraftPostgresPool) {
    return globalForDb.__precisionCraftPostgresPool;
  }

  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Add DATABASE_URL or POSTGRES_URL in Vercel Project Settings → Environment Variables.",
    );
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    // Keep pools small for serverless; use a pooled provider URL in production.
    max: Number(process.env.DB_POOL_MAX ?? (process.env.VERCEL ? 5 : 10)),
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
    ssl: isLocalDatabase(databaseUrl) ? false : { rejectUnauthorized: false },
  });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__precisionCraftPostgresPool = pool;
  }

  return pool;
}

export function getDb() {
  if (globalForDb.__precisionCraftDrizzle) {
    return globalForDb.__precisionCraftDrizzle;
  }

  const db = drizzle(getPool());

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__precisionCraftDrizzle = db;
  }

  return db;
}
