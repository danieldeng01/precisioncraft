# Precision Craft Backend Deployment on Vercel

The frontend is complete. The backend is now prepared for Vercel with PostgreSQL, Drizzle ORM, migrations, server-side validation, and production-ready environment variables.

## What is already set up in the codebase

- `src/db/schema.ts` defines the PostgreSQL tables:
  - `inquiries` — quote/contact form submissions
  - `newsletter_subscribers` — newsletter emails
- `drizzle.config.ts` reads `DATABASE_URL` or `POSTGRES_URL` from the environment.
- `drizzle/0000_left_texas_twister.sql` is the first generated SQL migration.
- `src/db/index.ts` uses a Vercel-friendly `pg` connection pool and SSL for hosted databases.
- API routes that use PostgreSQL are explicitly set to `runtime = "nodejs"` for Vercel.
- `.env.example` lists every required and optional environment variable.

## Recommended database option

Use **Vercel Postgres** or **Neon Postgres**. Vercel Postgres is powered by Neon and integrates directly with Vercel projects.

## Vercel setup steps

### 1. Create / connect PostgreSQL on Vercel

In Vercel:

1. Open your Vercel project.
2. Go to **Storage**.
3. Click **Create Database**.
4. Choose **Postgres**.
5. Select the same region as your deployment if possible.
6. Connect it to the Precision Craft project.

Vercel will automatically add environment variables such as `POSTGRES_URL`.

### 2. Add `DATABASE_URL`

The code supports either `DATABASE_URL` or `POSTGRES_URL`, but using `DATABASE_URL` keeps Drizzle commands consistent.

In Vercel:

1. Go to **Project Settings → Environment Variables**.
2. Add:

```bash
DATABASE_URL=<your pooled postgres connection string>
```

Use the pooled connection URL from Vercel Postgres / Neon. It should usually include SSL, for example:

```bash
postgresql://USER:PASSWORD@HOST/DB?sslmode=require
```

Also add:

```bash
DB_POOL_MAX=5
```

Apply these variables to **Production**, **Preview**, and **Development** unless you intentionally want separate databases.

### 3. Add optional production service variables

For email notifications:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Precision Craft Website <notifications@precisioncraft.co.ke>"
BUSINESS_NOTIFY_EMAIL=quotes@precisioncraft.co.ke
```

Important: the `RESEND_FROM_EMAIL` domain must be verified in Resend before production sending works reliably.

For Google Analytics:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

For Google Maps Embed API, optional:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

The website still works without a Maps key because it falls back to a keyless Google Maps embed.

### 4. Run the Drizzle migration against the production database

Run this once after creating the production database and setting `DATABASE_URL`.

From your local machine or a secure CI environment:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require" npx drizzle-kit migrate
```

Do **not** use `drizzle-kit push` for production. Use migrations.

If you are using Vercel Postgres and only have `POSTGRES_URL`, either set `DATABASE_URL` to the same value or run:

```bash
POSTGRES_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require" npx drizzle-kit migrate
```

### 5. Deploy on Vercel

Deploy normally from GitHub or the Vercel CLI. Vercel should run:

```bash
npm run build
```

No custom build command is required.

### 6. Verify after deploy

Open:

```bash
https://your-domain.co.ke/api/health
```

Expected response:

```json
{ "ok": true }
```

Then submit:

- One quote form request
- One newsletter signup

Confirm the rows appear in PostgreSQL and, if Resend is configured, that the business notification email arrives.

## Future migrations

When the schema changes:

```bash
npx drizzle-kit generate
DATABASE_URL="production-or-preview-db-url" npx drizzle-kit migrate
```

Commit the generated `drizzle/` files to Git.

## Vercel environment variable checklist

Required:

- `DATABASE_URL` or `POSTGRES_URL`

Recommended:

- `DB_POOL_MAX=5`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `BUSINESS_NOTIFY_EMAIL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY` optional

## Notes

- The app does not run migrations automatically during `npm run build`. This is intentional and safer for production.
- Use a pooled PostgreSQL connection string on Vercel.
- Keep migrations in Git so every environment can be reproduced.
