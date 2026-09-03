#!/bin/bash

echo "=== ITSHOPPING Deploy Script ==="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI topilmadi. O'rnatilmoqda..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "Vercelga kiring:"
    vercel login
fi

# Run tests
echo ""
echo "Testlar ishga tushirilmoqda..."
npm run test:run

if [ $? -ne 0 ]; then
    echo "Xatolik: Testlar o'tmadi!"
    exit 1
fi

# Run build
echo ""
echo "Build qilinmoqda..."
npm run build

if [ $? -ne 0 ]; then
    echo "Xatolik: Build xatosi!"
    exit 1
fi

# Deploy to preview
echo ""
echo "Preview deploy qilinmoqda..."
vercel

echo ""
echo "Preview URL: $(vercel inspect --url)"

# Ask for production deploy
read -p "Production deploy qilishni xohlaysizmi? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Production deploy qilinmoqda..."
    vercel --prod
    
    echo ""
    echo "Production URL: $(vercel inspect --prod --url)"
    echo ""
    echo "Deploy muvaffaqiyatli tugadi!"
fi
