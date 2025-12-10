# OpenAir IoT Website

A modern, single-page website for OpenAir Solutions, LLC.

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Choose "Upload" and drag the contents of this folder
4. Click Deploy

### Option 2: Deploy via GitHub

1. Create a new GitHub repository
2. Push this folder's contents to the repo
3. Connect the repo to Vercel
4. Vercel will auto-deploy on every push

## File Structure

```
├── vercel.json          # Redirects (/contact → /#contact, etc.)
└── public/
    ├── index.html       # Main website (single page)
    ├── logo.png         # OpenAir IoT logo
    └── favicon.png      # Browser tab icon
```

## URL Shortcuts

These redirects are configured in `vercel.json`:

- `/contact` → scrolls to contact section
- `/services` → scrolls to services section  
- `/about` → scrolls to about section
- `/about-us` → scrolls to about section

## Custom Domain Setup

After deployment:

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add `openairiot.com`
3. Vercel will show you DNS records to add
4. In GoDaddy DNS settings, add the A record pointing to Vercel's IP
5. Wait for DNS propagation (5-60 minutes)
6. Vercel automatically provisions SSL certificate (free)

## Future Improvements

- [ ] Add proper favicon.ico (32x32 icon version of logo)
- [ ] Add og-image.png for social sharing
- [ ] Consider adding a robots.txt and sitemap.xml for SEO
