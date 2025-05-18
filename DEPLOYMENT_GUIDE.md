# Trading Prediction Engine v6 - Frontend Deployment Guide

This document provides detailed instructions for deploying the frontend of the Trading Prediction Engine v6 to Vercel.

## Repository Structure

The frontend repository contains:

- `src/` - The React application source code
- `public/` - Static assets
- `package.json` - Node.js dependencies and scripts
- Various configuration files for React and TypeScript

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com/)
- Backend already deployed to Railway (see Backend Deployment Guide)

## Step 1: Create GitHub Repository

1. Go to GitHub.com and sign in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name: `trading-engine-v6-frontend`
4. Description: "React frontend for Trading Prediction Engine v6"
5. Choose Public or Private (your preference)
6. Check "Add a README file"
7. Click "Create repository"

## Step 2: Clone Repository to Your Local Machine

```bash
# Navigate to your project directory
cd ~/trading-engine-v6

# Clone the frontend repository
git clone https://github.com/YOUR_USERNAME/trading-engine-v6-frontend.git
# Replace YOUR_USERNAME with your actual GitHub username

# Navigate to the cloned repository
cd trading-engine-v6-frontend
```

## Step 3: Copy Frontend Files

1. Extract the frontend ZIP file you received
2. Copy all files from the extracted folder to your cloned repository:

```bash
# Assuming you extracted the ZIP to ~/Downloads/frontend
cp -R ~/Downloads/frontend_clean/* ~/trading-engine-v6/trading-engine-v6-frontend_clean/
```

## Step 4: Update API URL

Before pushing to GitHub, you need to update the API URL to point to your deployed backend:

1. Create a `.env` file in the root of the frontend repository:

```bash
# Create .env file
echo "REACT_APP_API_URL=https://trading-engine-v6-backend-production.up.railway.app/api" > .env
# Replace "your-backend-url.up.railway.app" with your actual Railway backend URL
```

## Step 5: Commit and Push to GitHub

```bash
# Add all files to git
git add .

# Commit the changes
git commit -m "Initial commit of frontend code"

# Push to GitHub
git push origin main
```

## Step 6: Deploy to Vercel

1. Go to Vercel.com and sign in
2. Click "Add New" → "Project"
3. Connect your GitHub account if not already connected
4. Select the `trading-engine-v6-frontend` repository
5. Vercel will automatically detect the React project
6. Configure the project:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
7. Add the following environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.up.railway.app/api`
   - Replace with your actual Railway backend URL
8. Click "Deploy"
9. Vercel will build and deploy your application
10. Once deployed, Vercel will provide a URL for your frontend (e.g., https://trading-engine-v6-frontend.vercel.app)

## Step 7: Verify Frontend Deployment

1. Visit your Vercel frontend URL in your browser
2. You should see the login page of the Trading Prediction Engine
3. Try logging in with a test account
4. Verify that the frontend can communicate with the backend

## Troubleshooting

### Build Fails

1. Check the Vercel build logs for error messages
2. Verify that all required files are in your repository
3. Ensure `package.json` contains all dependencies
4. Check that the Node.js version is compatible

### API Connection Issues

If the frontend cannot connect to the backend:

1. Verify that the `REACT_APP_API_URL` environment variable is correctly set in Vercel
2. Check that the backend URL is accessible
3. Ensure the backend CORS settings allow requests from your Vercel domain

### Authentication Problems

If Google authentication is not working:

1. Verify that your Google OAuth client is configured to allow your Vercel domain
2. Check that the `REACT_APP_GOOGLE_CLIENT_ID` is correctly set
3. Ensure the backend has the correct Google OAuth credentials

## Custom Domain (Optional)

To use a custom domain with your Vercel deployment:

1. Go to your project settings in Vercel
2. Click on "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS settings

## Next Steps

After successfully deploying both the backend and frontend:

1. Create a test account and explore the application
2. Verify all features are working correctly
3. Consider setting up monitoring and analytics
4. Plan for future updates and maintenance
