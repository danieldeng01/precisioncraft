# How to Share a Live Preview Before Buying a Domain

You do **not** need to buy a domain or separate hosting to share the website.

The best option is **Vercel Preview Deployments**.

## Option A — Recommended: Vercel free preview link

1. Push this project to GitHub.
2. Create a free Vercel account at https://vercel.com.
3. Click **Add New → Project**.
4. Import the GitHub repository.
5. Add the required environment variable:

```bash
DATABASE_URL=<your PostgreSQL connection string>
```

If you are not ready for a production database yet, create a free Vercel Postgres/Neon database from **Vercel → Storage → Create Database → Postgres**.

6. Click **Deploy**.

Vercel will give you a free shareable URL like:

```text
https://precision-craft.vercel.app
```

or a preview deployment URL like:

```text
https://precision-craft-git-main-yourname.vercel.app
```

You can send that link to clients, partners, or the business owner before buying the real domain.

## Preview links for every change

After the project is connected to GitHub:

- Every push to the main branch updates the live Vercel URL.
- Every pull request gets its own temporary preview URL.
- No domain purchase is needed.

## When you later buy the domain

After buying `precisioncraft.co.ke`, go to:

**Vercel Project → Settings → Domains**

Add:

```text
precisioncraft.co.ke
www.precisioncraft.co.ke
```

Vercel will show the DNS records to add at your domain registrar.

## Important note about this sandbox preview

The preview link generated inside this development sandbox is useful for quick testing, but it should not be treated as a permanent public link.

For a reliable link you can share for days or weeks, use Vercel.
