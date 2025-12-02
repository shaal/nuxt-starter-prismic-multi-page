# Cloudflare Pages Setup Guide

This guide walks through deploying your Nuxt + Prismic site to Cloudflare Pages with automatic deployments for all branches.

## Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free)
- Your code pushed to GitHub at `github.com/shaal/nuxt-starter-prismic-multi-page`

---

## Step 1: Connect Your Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select **Workers & Pages** from the left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select the repository: `shaal/nuxt-starter-prismic-multi-page`

---

## Step 2: Configure Build Settings

Cloudflare will auto-detect Nuxt, but verify these settings:

| Setting | Value |
|---------|-------|
| **Production branch** | `main` |
| **Framework preset** | Nuxt.js |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave empty) |
| **Node.js version** | `18` or `20` |

### Set Node.js Version

Add this environment variable in the build settings:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `20` |

---

## Step 3: Add Environment Variables

In the Cloudflare Pages settings, add your Prismic environment variable:

| Variable | Value |
|----------|-------|
| `NUXT_PUBLIC_PRISMIC_ENDPOINT` | `p2backpack` |

> **Note:** If you have a Prismic access token for private repositories, add it as `PRISMIC_ACCESS_TOKEN`

---

## Step 4: Deploy

Click **Save and Deploy**. Cloudflare will:

1. Clone your repository
2. Install dependencies (`npm install`)
3. Run the build (`npm run build`)
4. Deploy to their global edge network

First deployment takes 2-3 minutes. You'll get a URL like:
```
https://nuxt-starter-prismic-multi-page.pages.dev
```

---

## Automatic Branch Deployments

**This is enabled by default!** Every push to any branch triggers a preview deployment:

| Branch | URL Pattern |
|--------|-------------|
| `main` | `your-project.pages.dev` |
| `feature/hero` | `feature-hero.your-project.pages.dev` |
| `fix/button-style` | `fix-button-style.your-project.pages.dev` |

### How It Works

```
git checkout -b feature/new-hero
# make changes
git add .
git commit -m "Add new hero section"
git push -u origin feature/new-hero
```

Within ~2 minutes, Cloudflare deploys to:
```
https://feature-new-hero.nuxt-starter-prismic-multi-page.pages.dev
```

### GitHub Integration

Cloudflare automatically:
- Posts deployment status to your PR
- Adds a comment with the preview URL
- Updates status checks (can be required for merge)

---

## Step 5: Custom Domain (Optional)

1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `www.yourdomain.com`)
4. Follow DNS configuration instructions

If your domain is already on Cloudflare:
- DNS records are added automatically
- SSL certificate is provisioned instantly

If your domain is elsewhere:
- Add the CNAME record shown
- SSL provisioned within minutes

---

## CLI Deployment (Alternative)

For local deployments without pushing to GitHub:

### Install Wrangler

```bash
npm install -g wrangler
```

### Login to Cloudflare

```bash
wrangler login
```

### Deploy

```bash
npm run build
wrangler pages deploy dist
```

---

## Configuration File (Optional)

Create `wrangler.toml` for advanced configuration:

```toml
name = "p2backpack-site"
compatibility_date = "2024-01-01"

[vars]
NUXT_PUBLIC_PRISMIC_ENDPOINT = "p2backpack"

# Redirects (optional)
[[redirects]]
from = "/old-page"
to = "/new-page"
status = 301
```

---

## Build Caching

Cloudflare Pages caches `node_modules` between builds automatically. To bust the cache:

1. Go to your project → **Settings** → **Builds & deployments**
2. Click **Clear build cache**

---

## Monitoring & Analytics

### Web Analytics (Free)

1. Go to your Pages project
2. Click **Analytics** tab
3. View traffic, performance, and Core Web Vitals

### Real User Monitoring

Add to your `nuxt.config.ts` for detailed client-side analytics:

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://static.cloudflareinsights.com/beacon.min.js',
          defer: true,
          'data-cf-beacon': '{"token": "YOUR_TOKEN"}'
        }
      ]
    }
  }
})
```

Get your token from **Workers & Pages** → **Account Analytics**.

---

## Troubleshooting

### Build Fails with Node Version Error

Add `NODE_VERSION` environment variable set to `20`.

### Build Fails with Memory Error

Add environment variable:
```
NODE_OPTIONS = --max-old-space-size=4096
```

### Preview URL Not Working

Check that the branch name doesn't contain special characters. Cloudflare converts branch names:
- `feature/my-thing` → `feature-my-thing.your-project.pages.dev`
- Underscores and dots may cause issues

### Prismic Preview Not Working

Ensure your Prismic repository has the Cloudflare Pages URL added to the allowed preview URLs:
1. Go to https://p2backpack.prismic.io/settings
2. Add your `.pages.dev` URL to the preview configuration

---

## Summary

After setup, your workflow becomes:

```bash
# Create feature branch
git checkout -b feature/awesome-thing

# Make changes, commit, push
git add .
git commit -m "Add awesome thing"
git push -u origin feature/awesome-thing

# Cloudflare auto-deploys preview in ~2 mins
# Preview URL appears in your PR

# Merge to main
git checkout main
git merge feature/awesome-thing
git push

# Production auto-deploys in ~2 mins
```

Your production URL: `https://nuxt-starter-prismic-multi-page.pages.dev`
