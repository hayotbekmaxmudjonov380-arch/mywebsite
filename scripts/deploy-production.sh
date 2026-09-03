#!/bin/bash

echo "=== ITSHOPPING Production Deploy ==="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo -e "${RED}Error: .env.local not found${NC}"
  echo "Copy .env.production to .env.local and fill in the values"
  exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
  echo "Please login to Vercel:"
  vercel login
fi

echo ""
echo "Step 1: Running tests..."
npm run test:run

if [ $? -ne 0 ]; then
  echo -e "${RED}Tests failed. Aborting deployment.${NC}"
  exit 1
fi

echo ""
echo "Step 2: Running build..."
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Aborting deployment.${NC}"
  exit 1
fi

echo ""
echo "Step 3: Deploying to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed.${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo ""
echo "Next steps:"
echo "1. Set up environment variables in Vercel dashboard"
echo "2. Configure custom domain"
echo "3. Set up database migrations"
echo "4. Test all features"
