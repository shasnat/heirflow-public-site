# Setup Guide: HeirFlow Public Site Repository

This guide will help you set up the public-site as a standalone repository and deploy it to GitHub Pages.

## Prerequisites

- Git installed
- Node.js 20+ installed
- A GitHub account
- Access to DNS settings for heirflow.com (if using custom domain)

## Step 1: Initialize Git Repository

Run the setup script to initialize the git repository:

```bash
cd public-site
chmod +x setup-repo.sh
./setup-repo.sh
```

Or manually:

```bash
cd public-site
git init
git add .
git commit -m "Initial commit: HeirFlow public landing page"
git branch -M main
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `heirflow-public-site` or `heirflow-landing`
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

## Step 3: Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/heirflow-public-site.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `heirflow-public-site` with your actual GitHub username and repository name.

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to `main`

## Step 5: Configure Custom Domain (heirflow.com)

1. In the Pages settings, scroll to **Custom domain**
2. Enter `heirflow.com` and click **Save**
3. GitHub will provide DNS records to add:
   - **A records**: Add 4 A records pointing to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME record** (optional for www): `www.heirflow.com` → `YOUR_USERNAME.github.io`
4. Add these records to your DNS provider (wherever you manage heirflow.com DNS)
5. Wait for DNS propagation (can take up to 24 hours)
6. GitHub will automatically create an SSL certificate

**Note**: The `CNAME` file is already included in `public/public/CNAME` and will be copied during build.

## Step 6: Verify Deployment

1. After pushing, check the **Actions** tab in your GitHub repository
2. Wait for the workflow to complete (usually 1-2 minutes)
3. Visit your site at `https://heirflow.com` (or the GitHub Pages URL)
4. The site should be live!

## Development Workflow

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the site locally.

### Making Changes

1. Make your changes to the code
2. Test locally with `npm run dev`
3. Build to verify: `npm run build`
4. Commit and push:

```bash
git add .
git commit -m "Description of changes"
git push
```

The GitHub Actions workflow will automatically build and deploy.

### Build Output

The build output is in `dist/` directory (gitignored). This is what gets deployed to GitHub Pages.

## Troubleshooting

### Build Fails

- Check the Actions tab for error messages
- Verify Node.js version (should be 20+)
- Run `npm install` locally to check for dependency issues

### Domain Not Working

- Verify DNS records are correct
- Check DNS propagation: `dig heirflow.com` or use [dnschecker.org](https://dnschecker.org)
- Ensure CNAME file exists in `public/CNAME`
- Wait up to 24 hours for DNS changes to propagate

### Site Not Updating

- Check GitHub Actions workflow status
- Verify you pushed to `main` branch
- Clear browser cache
- Check if GitHub Pages is enabled in Settings

## Repository Structure

```
public-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── public/
│   └── CNAME                   # Custom domain configuration
├── src/
│   ├── components/             # React components
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── README.md                   # Project documentation
```

## Support

For issues or questions, refer to:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

