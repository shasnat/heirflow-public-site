# HeirFlow Public Landing Page

This is the public marketing landing page for heirflow.com, built as a minimal React application for deployment to GitHub Pages.

**This is a standalone repository** - completely independent from the main HeirFlow application.

## Quick Start

### First Time Setup

If this is a fresh clone or you're setting up the repository:

1. **Initialize the repository** (if not already done):
   ```bash
   ./setup-repo.sh
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **See SETUP.md** for detailed instructions on:
   - Connecting to GitHub
   - Enabling GitHub Pages
   - Configuring custom domain (heirflow.com)

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or the port Vite assigns).

## Building

Build for production:

```bash
npm run build
```

The output will be in the `dist/` directory, ready for deployment to GitHub Pages.

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

### Setup Instructions

See **[SETUP.md](./SETUP.md)** for complete setup and deployment instructions, including:
- Repository initialization
- GitHub Pages configuration
- Custom domain setup (heirflow.com)
- Troubleshooting guide

## Project Structure

```
public-site/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── LandingPage.tsx  # Main landing page component
│   │   └── FeatureCarousel.tsx  # Feature carousel component
│   ├── App.tsx              # Root app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   └── CNAME                # Custom domain configuration
├── dist/                    # Build output (gitignored)
└── package.json

```

## Features

- Responsive design matching the HeirFlow platform theme
- Interactive carousel showcasing platform features
- Clean, modern UI with blue/slate color scheme
- Optimized for GitHub Pages deployment

