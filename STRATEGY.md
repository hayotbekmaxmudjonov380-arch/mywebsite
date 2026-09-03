# ITSHOPPING — Stratategiya Fayli
## Haqiqiy Marketplacega Yo'l Xaritasi

---

## Hozirgi Holat: 22% tayyor
## Maqsad: 100% production-ready marketplace

---

## 1-QADAM: Ma'lumotlar Bazasi (Prioritet: YUQORI)
**Muddat: 1-2 kun**

- [ ] PostgreSQL o'rnatish yoki Supabase/Neon cloud database yaratish
- [ ] Prisma ORM o'rnatish (`npm install prisma @prisma/client`)
- [ ] Schema yaratish:
  - `User` (id, telegramId, username, firstName, role, createdAt)
  - `Product` (id, name, slug, description, price, category, cover, features, deliveryTime)
  - `License` (id, productId, name, price, features)
  - `Order` (id, userId, productId, licenseId, amount, status, createdAt)
  - `Favorite` (id, userId, productId)
- [ ] `prisma db push` bilan bazaga sync qilish
- [ ] `catalog.ts` dan hardcoded data ni database ga ko'chirish

---

## 2-QADAM: Haqiqiy Auth Tizimi (Prioritet: YUQORI)
**Muddat: 2-3 kun**

- [ ] NextAuth.js o'rnatish (`npm install next-auth`)
- [ ] Telegram provider sozlash
- [ ] Cookie-based session (localStorage emas)
- [ ] Middleware yaratish — himoyalangan sahifalarni himoya qilish
- [ ] Admin rolini database da saqlash
- [ ] `/api/auth/request` endpointni to'g'rilash — faqat haqiqiy Telegram foydalanuvchilarni qabul qilish
- [ ] Rate limiting qo'shish (4 ta kodni brute force qilishni to'xtatish)

---

## 3-QADAM: To'lov Tizimi (Prioritet: YUQORI)
**Muddat: 3-4 kun**

- [ ] Stripe o'rnatish (`npm install stripe @stripe/stripe-js`)
- [ ] Stripe webhook sozlash
- [ ] Checkout session yaratish
- [ ] Payment intent flow
- [ ] To'lov muvaffaqiyatli bo'lsa → Order yaratish
- [ ] To'lov xato bo'lsa → Xabar ko'rsatish
- [ ] Stripe Dashboard dan to'lovlarni kuzatish

---

## 4-QADAM: Mahsulot Yetkazish (Prioritet: YUQORI)
**Muddat: 2-3 kun**

- [ ] AWS S3 yoki Cloudinary ga fayllarni saqlash
- [ ] Download link yaratish (vaqtincha URL)
- [ ] Buyurtma tasdiqlangandan keyin download link yaratish
- [ ] Download count cheklovi
- [ ] Fayl hajmi cheklovi

---

## 5-QADAM: API Endpointlarni Xavfsiz Qilish (Prioritet: O'RTA)
**Muddat: 1-2 kun**

- [ ] `middleware.ts` yaratish
- [ ] CORS sozlash
- [ ] Rate limiting (express-rate-limit yoki custom)
- [ ] CSRF himoya
- [ ] Input validation (Zod schema)
- [ ] Security headers (CSP, X-Frame-Options, va h.k.)
- [ ] `/admin` sahifasini himoya qilish — faqat admin kirishi mumkin

---

## 6-QADAM: Admin Paneli (Prioritet: O'RTA)
**Muddat: 2-3 kun**

- [ ] Mahsulotlarni qo'shish/tahrirlash/o'chirish (CRUD)
- [ ] Buyurtmalarni ko'rish va boshqarish
- [ ] Foydalanuvchilarni ko'rish
- [ ] Statistika dashboard (sotilgan mahsulotlar, daromad)
- [ ] Roli: admin faqat

---

## 7-QADAM: SEO va Marketing (Prioritet: O'RTA)
**Muddat: 1-2 kun**

- [ ] `robots.txt` yaratish
- [ ] `sitemap.xml` yaratish (dynamic routes uchun)
- [ ] Open Graph meta teglar
- [ ] Twitter Cards
- [ ] JSON-LD structured data (Product, Organization)
- [ ] Canonical URLs
- [ ] `generateMetadata` — barcha sahifalar uchun

---

## 8-QADAM: Xatoliklarni Boshqarish (Prioritet: O'RTA)
**Muddat: 1 kun**

- [ ] React Error Boundary yaratish
- [ ] `error.tsx` fayllar — har bir route uchun
- [ ] `loading.tsx` fayllar — skeleton loaders
- [ ] Sentry integration (xatoliklarni kuzatish)
- [ ] Structured logging

---

## 9-QADAM: Testlar (Past Prioritet)
**Muddat: 2-3 kun**

- [ ] Vitest o'rnatish (unit tests)
- [ ] Playwright o'rnatish (E2E tests)
- [ ] Auth flow testlari
- [ ] Cart flow testlari
- [ ] Payment flow testlari
- [ ] API endpoint testlari

---

## 10-QADAM: Deploy va CI/CD (Past Prioritet)
**Muddat: 1-2 kun**

- [ ] Vercel ga deploy qilish
- [ ] GitHub Actions — avtomatik test va deploy
- [ ] Environment variables — Vercel dagi sozlash
- [ ] Domain ulash (itshopping.uz yoki boshqa)
- [ ] SSL sertifikat
- [ ] CDN sozlash

---

## 11-QADAM: Qo'shimcha Imkoniyatlar (Optional)
**Muddat: 3-5 kun**

- [ ] Email xabarnomalar (buyurtma tasdiqlash)
- [ ] Newsletter — email to'plam
- [ ] Blog sahifasi
- [ ] FAQ sahifasi
- [ ] Terms of Service / Privacy Policy
- [ ] Refund tizimi
- [ ] Affiliate dastur
- [ ] Promo code / Chegirmalar

---

## Umumiy Jadval

| Qadam | Ish | Muddat | Holat |
|-------|-----|--------|-------|
| 1 | Database | 1-2 kun | ⏳ |
| 2 | Auth | 2-3 kun | ⏳ |
| 3 | To'lov | 3-4 kun | ⏳ |
| 4 | Yetkazish | 2-3 kun | ⏳ |
| 5 | Xavfsizlik | 1-2 kun | ⏳ |
| 6 | Admin | 2-3 kun | ⏳ |
| 7 | SEO | 1-2 kun | ⏳ |
| 8 | Xatoliklar | 1 kun | ⏳ |
| 9 | Testlar | 2-3 kun | ⏳ |
| 10 | Deploy | 1-2 kun | ⏳ |
| 11 | Qo'shimcha | 3-5 kun | ⏳ |
| **JAMI** | | **15-30 kun** | |

---

## Texnologiyalar

| Qator | Texnologiya | Sabab |
|-------|-------------|-------|
| Database | PostgreSQL + Prisma | Ishonchli, tez, ORM qulay |
| Auth | NextAuth.js + Telegram | Next.js bilan yaxshi integratsiya |
| To'lov | Stripe | Xalqaro, ishonchli, API qulay |
| Saqlash | AWS S3 yoki Cloudinary | Fayllarni saqlash |
| Deploy | Vercel | Next.js uchun eng yaxshi |
| Test | Vitest + Playwright | Tez va ishonchli |
| Monitoring | Sentry | Xatoliklarni kuzatish |

---

## Eslatma

Bu fayl har bir qadam tugagandan keyin yangilanadi.
Har bir qadam "completed" deb belgilanadi.

**Boshlash kerak: 1-QADAM (Database)**
