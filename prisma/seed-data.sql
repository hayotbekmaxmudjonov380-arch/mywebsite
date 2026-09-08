-- ITSHOPPING Seed Data for Supabase

-- Products
INSERT INTO "Product" ("id", "name", "slug", "description", "longDescription", "category", "categoryPlatform", "price", "cover", "badges", "tags", "rating", "reviews", "deliveryTime", "createdAt", "updatedAt") VALUES
('orbit-crm', 'Orbit CRM', 'orbit-crm', 'A calm, modern CRM for teams that want to move fast.', 'Orbit brings contacts, deals, and conversations into one thoughtful workspace. Built for modern teams who need clarity without the enterprise bloat.', 'Business Systems', 'business', 149, 'linear-gradient(135deg, #182444 0%, #0c1428 55%, #151b36 100%)', 'Bestseller,Production Ready', 'CRM,SaaS,Dashboard', 4.9, 42, 'Instant download', NOW(), NOW()),
('lumina-ai', 'Lumina AI', 'lumina-ai', 'Your team''s intelligent workspace for better decisions.', 'Lumina turns scattered knowledge into a searchable, useful layer for your team. Ask questions, summarize documents, and keep momentum.', 'AI Solutions', 'ai', 199, 'linear-gradient(135deg, #282419 0%, #17140f 45%, #233328 100%)', 'New,AI Ready', 'AI,Knowledge Base,RAG', 4.8, 28, 'Instant download', NOW(), NOW()),
('nordic-wallet', 'Nordic Wallet', 'nordic-wallet', 'A beautifully simple finance app for everyday clarity.', 'Nordic Wallet gives people a clearer view of their money through quiet design, useful automation, and an interface that feels good to return to.', 'Mobile Apps', 'mobile', 89, 'linear-gradient(135deg, #1d2946 0%, #111c32 58%, #292d4b 100%)', 'Mobile', 'Fintech,iOS,Android', 4.7, 19, 'Instant download', NOW(), NOW()),
('flowbot', 'Flowbot', 'flowbot', 'A Telegram bot that turns conversations into workflows.', 'Flowbot automates the repetitive parts of community management and support without making your team learn a new system.', 'Telegram', 'telegram', 79, 'linear-gradient(135deg, #172a37 0%, #0e1a2a 58%, #143839 100%)', 'Bestseller', 'Telegram,Automation,Bot', 4.9, 31, 'Instant download', NOW(), NOW()),
('studio-os', 'Studio OS', 'studio-os', 'The operating system for your creative business.', 'A focused workspace for briefs, projects, clients, and invoices. Studio OS gives independent teams the structure to do their best work.', 'Web Apps', 'web', 129, 'linear-gradient(135deg, #182f35 0%, #101d2b 58%, #263a39 100%)', 'New', 'Workspace,Projects,Web App', 4.6, 16, 'Instant download', NOW(), NOW()),
('pixel-engine', 'Pixel Engine', 'pixel-engine', 'A polished desktop toolkit for visual asset systems.', 'Pixel Engine helps design teams create, organize, and export consistent visual assets at speed.', 'Desktop', 'desktop', 109, 'linear-gradient(135deg, #292143 0%, #171528 58%, #202e4b 100%)', 'Production Ready', 'Desktop,Design Tools,Assets', 4.8, 12, 'Instant download', NOW(), NOW());

-- Licenses
INSERT INTO "License" ("id", "name", "description", "price", "features", "productId", "createdAt", "updatedAt") VALUES
('orbit-crm-personal', 'Personal', 'For learning and personal projects', 149, 'Source code,Documentation,Community support', 'orbit-crm', NOW(), NOW()),
('orbit-crm-commercial', 'Commercial', 'For client and business use', 372, 'Source code,Commercial license,Priority support,Lifetime updates', 'orbit-crm', NOW(), NOW()),
('lumina-ai-personal', 'Personal', 'For learning and personal projects', 199, 'Source code,Documentation,Community support', 'lumina-ai', NOW(), NOW()),
('lumina-ai-commercial', 'Commercial', 'For client and business use', 498, 'Source code,Commercial license,Priority support,Lifetime updates', 'lumina-ai', NOW(), NOW()),
('nordic-wallet-personal', 'Personal', 'For learning and personal projects', 89, 'Source code,Documentation,Community support', 'nordic-wallet', NOW(), NOW()),
('nordic-wallet-commercial', 'Commercial', 'For client and business use', 223, 'Source code,Commercial license,Priority support,Lifetime updates', 'nordic-wallet', NOW(), NOW()),
('flowbot-personal', 'Personal', 'For learning and personal projects', 79, 'Source code,Documentation,Community support', 'flowbot', NOW(), NOW()),
('flowbot-commercial', 'Commercial', 'For client and business use', 198, 'Source code,Commercial license,Priority support,Lifetime updates', 'flowbot', NOW(), NOW()),
('studio-os-personal', 'Personal', 'For learning and personal projects', 129, 'Source code,Documentation,Community support', 'studio-os', NOW(), NOW()),
('studio-os-commercial', 'Commercial', 'For client and business use', 323, 'Source code,Commercial license,Priority support,Lifetime updates', 'studio-os', NOW(), NOW()),
('pixel-engine-personal', 'Personal', 'For learning and personal projects', 109, 'Source code,Documentation,Community support', 'pixel-engine', NOW(), NOW()),
('pixel-engine-commercial', 'Commercial', 'For client and business use', 273, 'Source code,Commercial license,Priority support,Lifetime updates', 'pixel-engine', NOW(), NOW());

-- Blog Posts
INSERT INTO "BlogPost" ("id", "title", "slug", "content", "excerpt", "author", "category", "tags", "published", "views", "createdAt", "updatedAt") VALUES
('blog-1', 'ITSHOPPING ga xush kelibsiz', 'welcome-to-itshopping', '<h2>Xush kelibsiz!</h2><p>ITSHOPPING - bu raqamli mahsulotlar marketplace''i.</p>', 'ITSHOPPING marketplace''iga xush kelibsiz.', 'ITSHOPPING', 'news', 'yangilik,marketplace', true, 125, NOW(), NOW()),
('blog-2', 'Raqamli mahsulotni qanday sotib olish mumkin?', 'how-to-buy', '<h2>Qadam-baqadam ko''rsatma</h2><p>1. Mahsulotni tanlang</p><p>2. Litsenziyani tanlang</p><p>3. To''lovni amalga oshiring</p><p>4. Faylni yuklab oling</p>', 'Raqamli mahsulotni sotib olish jarayoni.', 'ITSHOPPING', 'tutorial', 'qo''llanma,sotib olish', true, 89, NOW(), NOW());

-- FAQs
INSERT INTO "FAQ" ("id", "question", "answer", "category", "order", "createdAt", "updatedAt") VALUES
('faq-1', 'ITSHOPPING nima?', 'ITSHOPPING - bu O''zbekistondagi raqamli mahsulotlar marketplace''i.', 'general', 1, NOW(), NOW()),
('faq-2', 'Qanday to''lov qilish mumkin?', 'Biz Stripe orqali to''lovni qo''llab-quvvatlaymiz.', 'payment', 2, NOW(), NOW()),
('faq-3', 'To''lovdan keyin faylni qanday yuklab olish mumkin?', 'To''lovdan so''ng sizning emailingizga yuklab olish havolasi yuboriladi.', 'download', 3, NOW(), NOW()),
('faq-4', 'Litsenziya nima?', 'Litsenziya - bu mahsulotdan foydalanish huquqi.', 'general', 4, NOW(), NOW()),
('faq-5', 'Qaytarish siyosati qanday?', 'Raqamli mahsulotlar uchun qaytarish mumkin emas.', 'payment', 5, NOW(), NOW()),
('faq-6', 'Texnik yordamni qanday olish mumkin?', 'Contact sahifasi orqali bizga yozing.', 'general', 6, NOW(), NOW());
