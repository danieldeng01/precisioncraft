# Precision Craft Image Assets

These files are required by the website and must be committed with the project.

The frontend references them using root-relative paths such as `/images/hero-kitchen.jpg`.
In Next.js, files inside `public/` are served from the site root, so:

```text
public/images/hero-kitchen.jpg
```

is available at:

```text
/images/hero-kitchen.jpg
```

## Required assets

- `hero-kitchen.jpg` — homepage hero kitchen image
- `craft-workshop.jpg` — about/workshop craftsmanship image
- `svc-kitchen.jpg` — bespoke kitchens service/product image
- `svc-wardrobe.jpg` — wardrobes and closets image
- `svc-media.jpg` — media walls and panelling image
- `svc-vanity.jpg` — bathroom vanity image
- `svc-commercial.jpg` — commercial interiors image
- `pf-villa.jpg` — portfolio villa/residential kitchen image
- `pf-office.jpg` — portfolio executive office image

## Deployment note

If images are missing on Vercel, confirm the entire `public/images/` directory is present in GitHub and not excluded by `.gitignore`.

Quick local check:

```bash
find public/images -maxdepth 1 -type f
```

Quick deployed check:

```text
https://your-vercel-preview-url.vercel.app/images/hero-kitchen.jpg
```
