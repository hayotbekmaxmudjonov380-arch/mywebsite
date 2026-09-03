# ITSHOPPING - Digital Product Marketplace

Uzbek tilida raqamli mahsulotlar marketplace'i.

## Texnologiyalar

- **Framework:** Next.js 16.3.3 (Turbopack)
- **Database:** Prisma 6.19.3 (SQLite dev/PostgreSQL prod)
- **Auth:** Database-backed sessions
- **Payment:** Stripe
- **Storage:** AWS S3
- **Monitoring:** Sentry
- **Testing:** Vitest + Playwright
- **Deploy:** Vercel

## O'rnatish

```bash
# Dependencies o'rnatish
npm install

# Database yaratish
npm run db:generate
npm run db:push

# Seed script ishga tushirish
npm run db:seed

# Development server
npm run dev
```

## Deploy

### Vercel

```bash
# Vercel CLI o'rnatish
npm install -g vercel

# Login
vercel login

# Preview deploy
vercel

# Production deploy
vercel --prod
```

### GitHub Actions

Repository settings'da quyidagi secrets'larni qo'shing:

- `VERCEL_TOKEN` - Vercel access token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID
- `DATABASE_URL` - PostgreSQL connection string

### Docker

```bash
# Build
docker build -t itshopping .

# Run
docker run -p 3000:3000 itshopping
```

## Environment Variables

`.env.example` faylini `.env.local` ga nusxalab, qiymatlarni to'ldiring:

- `DATABASE_URL` - Database connection string
- `TELEGRAM_BOT_TOKEN` - Telegram bot token
- `STRIPE_SECRET_KEY` - Stripe secret key
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key

## Testlar

```bash
# Unit testlar
npm run test

# E2E testlar
npm run test:e2e

# Coverage bilan
npm run test:coverage
```

## Deploy URL

- **Production:** https://itshopping.uz
- **Preview:** https://itshopping-xxxxx.vercel.app

## Qo'shimcha ma'lumot

- [STRATEGY.md](./STRATEGY.md) - Roadmap
- [PRISMA.md](./PRISMA.md) - Database dokumentatsiyasi
