#!/bin/bash

echo "=== ITSHOPPING Setup Wizard ==="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  cp .env.production .env.local
  echo -e "${GREEN}Created .env.local from .env.production${NC}"
fi

echo ""
echo -e "${BLUE}Step 1: Database Configuration${NC}"
echo "Choose database provider:"
echo "1) Supabase (Recommended - Free)"
echo "2) Vercel Postgres"
echo "3) Neon"
echo "4) Other PostgreSQL"
read -p "Enter choice (1-4): " db_choice

case $db_choice in
  1)
    echo ""
    echo "Go to https://supabase.com and create a new project"
    echo "Then copy the connection string from Settings > Database"
    read -p "Enter Supabase connection string: " db_url
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$db_url\"|" .env.local
    ;;
  2)
    echo ""
    echo "Go to Vercel Dashboard > Storage > Create Database"
    echo "Then copy the connection string"
    read -p "Enter Vercel Postgres connection string: " db_url
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$db_url\"|" .env.local
    ;;
  3)
    echo ""
    echo "Go to https://neon.tech and create a new project"
    echo "Then copy the connection string"
    read -p "Enter Neon connection string: " db_url
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$db_url\"|" .env.local
    ;;
  4)
    echo ""
    read -p "Enter PostgreSQL connection string: " db_url
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$db_url\"|" .env.local
    ;;
esac

echo ""
echo -e "${BLUE}Step 2: Stripe Configuration${NC}"
echo "Go to https://stripe.com and get your API keys"
read -p "Enter Stripe Secret Key (sk_live_...): " stripe_key
read -p "Enter Stripe Webhook Secret (whsec_...): " webhook_secret

sed -i "s|STRIPE_SECRET_KEY=.*|STRIPE_SECRET_KEY=\"$stripe_key\"|" .env.local
sed -i "s|STRIPE_WEBHOOK_SECRET=.*|STRIPE_WEBHOOK_SECRET=\"$webhook_secret\"|" .env.local

echo ""
echo -e "${BLUE}Step 3: AWS S3 Configuration${NC}"
echo "Go to AWS Console > IAM > Users > Create User"
echo "Then create access key and copy the values"
read -p "Enter AWS Access Key ID: " aws_key
read -p "Enter AWS Secret Access Key: " aws_secret
read -p "Enter AWS Region (default: eu-central-1): " aws_region
read -p "Enter S3 Bucket Name: " bucket_name

sed -i "s|AWS_ACCESS_KEY_ID=.*|AWS_ACCESS_KEY_ID=\"$aws_key\"|" .env.local
sed -i "s|AWS_SECRET_ACCESS_KEY=.*|AWS_SECRET_ACCESS_KEY=\"$aws_secret\"|" .env.local
sed -i "s|AWS_REGION=.*|AWS_REGION=\"${aws_region:-eu-central-1}\"|" .env.local
sed -i "s|AWS_S3_BUCKET_NAME=.*|AWS_S3_BUCKET_NAME=\"$bucket_name\"|" .env.local

echo ""
echo -e "${BLUE}Step 4: Telegram Bot Configuration${NC}"
echo "Go to Telegram > @BotFather > /newbot"
read -p "Enter Bot Token: " bot_token
read -p "Enter Bot Username: " bot_username

sed -i "s|TELEGRAM_BOT_TOKEN=.*|TELEGRAM_BOT_TOKEN=\"$bot_token\"|" .env.local
sed -i "s|TELEGRAM_BOT_USERNAME=.*|TELEGRAM_BOT_USERNAME=\"$bot_username\"|" .env.local

echo ""
echo -e "${BLUE}Step 5: Resend (Email) Configuration${NC}"
echo "Go to https://resend.com and create an account"
read -p "Enter Resend API Key (re_...): " resend_key

sed -i "s|RESEND_API_KEY=.*|RESEND_API_KEY=\"$resend_key\"|" .env.local

echo ""
echo -e "${BLUE}Step 6: Site URL${NC}"
read -p "Enter your domain (default: https://itshopping.uz): " site_url

sed -i "s|NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=\"${site_url:-https://itshopping.uz}\"|" .env.local

echo ""
echo -e "${GREEN}=== Setup Complete ===${NC}"
echo ""
echo "Next steps:"
echo "1. Run: npm run db:generate"
echo "2. Run: npm run db:migrate"
echo "3. Run: npm run db:seed"
echo "4. Run: npm run dev"
echo ""
