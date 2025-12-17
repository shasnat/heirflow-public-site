#!/bin/bash

# Setup script to initialize public-site as a standalone git repository

set -e

echo "🚀 Setting up public-site as a standalone git repository..."
echo ""

# Check if .git already exists
if [ -d ".git" ]; then
    echo "⚠️  Warning: .git directory already exists!"
    read -p "Do you want to continue? This will reinitialize git. (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
    rm -rf .git
fi

# Initialize git repository
echo "📦 Initializing git repository..."
git init

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: HeirFlow public landing page"

echo ""
echo "✅ Git repository initialized successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub (e.g., 'heirflow-public-site')"
echo "2. Add the remote:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/heirflow-public-site.git"
echo "3. Push to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Enable GitHub Pages in repository Settings → Pages"
echo "5. Configure custom domain (heirflow.com) in Pages settings"
echo ""
echo "See SETUP.md for detailed instructions."

