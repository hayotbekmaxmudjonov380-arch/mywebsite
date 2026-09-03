const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Database seed boshlandi...')

  // Categories
  const categories = [
    { id: 'mobile', name: 'Mobile Apps', slug: 'mobile', description: 'iOS & Android products built for real users.', platform: 'mobile', icon: '▦', color: '#6b8cff' },
    { id: 'desktop', name: 'Desktop', slug: 'desktop', description: 'Native software for focused workflows.', platform: 'desktop', icon: '▣', color: '#9b8cff' },
    { id: 'web', name: 'Web Apps', slug: 'web', description: 'Production-ready web experiences.', platform: 'web', icon: '◈', color: '#55c7bd' },
    { id: 'telegram', name: 'Telegram', slug: 'telegram', description: 'Bots and mini apps for communities.', platform: 'telegram', icon: '➤', color: '#63a9e9' },
    { id: 'ai', name: 'AI Solutions', slug: 'ai', description: 'Intelligent tools that move ideas forward.', platform: 'ai', icon: '✦', color: '#d6b26e' },
    { id: 'business', name: 'Business Systems', slug: 'business', description: 'Systems that make operations flow.', platform: 'business', icon: '⌁', color: '#df7d84' },
    { id: 'institute', name: 'Institute Materials', slug: 'institute', description: 'Slides, documents, articles and coursework.', platform: 'institute', icon: '📎', color: '#e8945a' },
  ]

  // Products
  const products = [
    {
      id: 'orbit-crm', name: 'Orbit CRM', slug: 'orbit-crm',
      description: 'A calm, modern CRM for teams that want to move fast.',
      longDescription: 'Orbit brings contacts, deals, and conversations into one thoughtful workspace. Built for modern teams who need clarity without the enterprise bloat.',
      category: 'Business Systems', categoryPlatform: 'business', price: 149,
      cover: 'linear-gradient(135deg, #182444 0%, #0c1428 55%, #151b36 100%)',
      badges: 'Bestseller,Production Ready', tags: 'CRM,SaaS,Dashboard',
      rating: 4.9, reviews: 42, deliveryTime: 'Instant download',
    },
    {
      id: 'lumina-ai', name: 'Lumina AI', slug: 'lumina-ai',
      description: 'Your team\'s intelligent workspace for better decisions.',
      longDescription: 'Lumina turns scattered knowledge into a searchable, useful layer for your team. Ask questions, summarize documents, and keep momentum.',
      category: 'AI Solutions', categoryPlatform: 'ai', price: 199,
      cover: 'linear-gradient(135deg, #282419 0%, #17140f 45%, #233328 100%)',
      badges: 'New,AI Ready', tags: 'AI,Knowledge Base,RAG',
      rating: 4.8, reviews: 28, deliveryTime: 'Instant download',
    },
    {
      id: 'nordic-wallet', name: 'Nordic Wallet', slug: 'nordic-wallet',
      description: 'A beautifully simple finance app for everyday clarity.',
      longDescription: 'Nordic Wallet gives people a clearer view of their money through quiet design, useful automation, and an interface that feels good to return to.',
      category: 'Mobile Apps', categoryPlatform: 'mobile', price: 89,
      cover: 'linear-gradient(135deg, #1d2946 0%, #111c32 58%, #292d4b 100%)',
      badges: 'Mobile', tags: 'Fintech,iOS,Android',
      rating: 4.7, reviews: 19, deliveryTime: 'Instant download',
    },
    {
      id: 'flowbot', name: 'Flowbot', slug: 'flowbot',
      description: 'A Telegram bot that turns conversations into workflows.',
      longDescription: 'Flowbot automates the repetitive parts of community management and support without making your team learn a new system.',
      category: 'Telegram', categoryPlatform: 'telegram', price: 79,
      cover: 'linear-gradient(135deg, #172a37 0%, #0e1a2a 58%, #143839 100%)',
      badges: 'Bestseller', tags: 'Telegram,Automation,Bot',
      rating: 4.9, reviews: 31, deliveryTime: 'Instant download',
    },
    {
      id: 'studio-os', name: 'Studio OS', slug: 'studio-os',
      description: 'The operating system for your creative business.',
      longDescription: 'A focused workspace for briefs, projects, clients, and invoices. Studio OS gives independent teams the structure to do their best work.',
      category: 'Web Apps', categoryPlatform: 'web', price: 129,
      cover: 'linear-gradient(135deg, #182f35 0%, #101d2b 58%, #263a39 100%)',
      badges: 'New', tags: 'Workspace,Projects,Web App',
      rating: 4.6, reviews: 16, deliveryTime: 'Instant download',
    },
    {
      id: 'pixel-engine', name: 'Pixel Engine', slug: 'pixel-engine',
      description: 'A polished desktop toolkit for visual asset systems.',
      longDescription: 'Pixel Engine helps design teams create, organize, and export consistent visual assets at speed.',
      category: 'Desktop', categoryPlatform: 'desktop', price: 109,
      cover: 'linear-gradient(135deg, #292143 0%, #171528 58%, #202e4b 100%)',
      badges: 'Production Ready', tags: 'Desktop,Design Tools,Assets',
      rating: 4.8, reviews: 12, deliveryTime: 'Instant download',
    },
  ]

  // Blog Posts
  const blogPosts = [
    {
      title: 'ITSHOPPING ga xush kelibsiz',
      slug: 'welcome-to-itshopping',
      content: `
        <h2>Xush kelibsiz!</h2>
        <p>ITSHOPPING - bu raqamli mahsulotlar marketplace'i. Bu yerda siz turli xil dasturiy ta'minotlarni, ilovalarni va boshqa raqamli mahsulotlarni sotib olishingiz mumkin.</p>
        
        <h3>Nima uchun ITSHOPPING?</h3>
        <ul>
          <li>Sifatli mahsulotlar</li>
          <li>Tez yetkazib berish</li>
          <li>Qulay to'lov usullari</li>
          <li>24/7 qo'llab-quvvatlash</li>
        </ul>
        
        <p>Bizning maqsadimiz - O'zbekistondagi eng yaxshi raqamli mahsulotlar markazi bo'lish.</p>
      `,
      excerpt: 'ITSHOPPING marketplace\'iga xush kelibsiz. Bizning afzalliklarimiz va imkoniyatlarimiz haqida bilib oling.',
      author: 'ITSHOPPING',
      category: 'news',
      tags: 'yangilik,marketplace',
      published: true,
      views: 125,
    },
    {
      title: 'Raqamli mahsulotni qanday sotib olish mumkin?',
      slug: 'how-to-buy-digital-product',
      content: `
        <h2>Qadam-baqadam ko'rsatma</h2>
        
        <h3>1. Mahsulotni tanlang</h3>
        <p>Do'konda kerakli mahsulotni toping va uni tanlang.</p>
        
        <h3>2. Litsenziyani tanlang</h3>
        <p>Shaxsiy yoki tijoriy litsenziyani tanlang.</p>
        
        <h3>3. To'lovni amalga oshiring</h3>
        <p>Stripe orqali xavfsiz to'lovni amalga oshiring.</p>
        
        <h3>4. Faylni yuklab oling</h3>
        <p>To'lovdan so'ng darhol faylni yuklab olishingiz mumkin.</p>
      `,
      excerpt: 'Raqamli mahsulotni sotib olish jarayoni haqida batafsil ko\'rsatma.',
      author: 'ITSHOPPING',
      category: 'tutorial',
      tags: 'qo\'llanma,sotib olish',
      published: true,
      views: 89,
    },
    {
      title: 'Telegram botini qanday yaratish mumkin?',
      slug: 'how-to-create-telegram-bot',
      content: `
        <h2>Telegram bot yaratish</h2>
        
        <h3>1. BotFather ga yozing</h3>
        <p>Telegram'da @BotFather ni toping va /newbot buyrug'ini yuboring.</p>
        
        <h3>2. Bot nomini kiriting</h3>
        <p>Botingiz uchun nom va username kiriting.</p>
        
        <h3>3. Tokenni oling</h3>
        <p>BotFather sizga token beradi. Uni saqlang.</p>
        
        <h3>4. Dasturlashni boshlang</h3>
        <p>Python yoki Node.js yordamida botingizni dasturlang.</p>
      `,
      excerpt: 'Telegram botini qanday yaratish va uni ishga tushirish haqida batafsil.',
      author: 'ITSHOPPING',
      category: 'tutorial',
      tags: 'telegram,bot,dasturlash',
      published: true,
      views: 156,
    },
  ]

  // FAQs
  const faqs = [
    {
      question: 'ITSHOPPING nima?',
      answer: `ITSHOPPING - bu O'zbekistondagi raqamli mahsulotlar marketplace'i. Bu yerda siz dasturiy ta'minot, ilova, bot va boshqa raqamli mahsulotlarni sotib olishingiz mumkin.`,
      category: 'general',
      order: 1,
    },
    {
      question: 'Qanday to\'lov qilish mumkin?',
      answer: `Biz Stripe orqali to'lovni qo'llab-quvvatlaymiz. Siz Visa, Mastercard va boshqa kartalar orqali to'lov qilishingiz mumkin.`,
      category: 'payment',
      order: 2,
    },
    {
      question: 'To\'lovdan keyin faylni qanday yuklab olish mumkin?',
      answer: `To'lovdan so'ng sizning emailingizga yuklab olish havolasi yuboriladi. Shuningdek, "Mening akkauntim" sahifasidan ham fayllarni yuklab olishingiz mumkin.`,
      category: 'download',
      order: 3,
    },
    {
      question: 'Litsenziya nima?',
      answer: `Litsenziya - bu mahsulotdan foydalanish huquqi. Shaxsiy litsenziya faqat shaxsiy foydalanish uchun, tijoriy litsenzi esa biznes maqsadlarda foydalanish imkonini beradi.`,
      category: 'general',
      order: 4,
    },
    {
      question: 'Qaytarish siyosati qanday?',
      answer: `Raqamli mahsulotlar uchun qaytarish mumkin emas. Lekin agar mahsulotda muammo bo'lsa, biz bilan bog'laning va biz muammoni hal qilamiz.`,
      category: 'payment',
      order: 5,
    },
    {
      question: 'Texnik yordamni qanday olish mumkin?',
      answer: `Bizning qo'llab-quvvatlash jamoamiz sizga yordam berishga tayyor. Contact sahifasi orqali bizga yozing yoki Telegram'da @itshopping_support ga yozing.`,
      category: 'general',
      order: 6,
    },
    {
      question: 'Mahsulotni yangilash mumkinmi?',
      answer: `Ha, barcha mahsulotlarimiz uchun yangiliklar mavjud. Yangiliklar bo'lganda sizning emailingizga xabar yuboriladi.`,
      category: 'download',
      order: 7,
    },
    {
      question: 'API mavjudmi?',
      answer: `Hozircha API mavjud emas. Lekin kelajakda API qo'shishni rejalashtirmoqdamiz.`,
      category: 'general',
      order: 8,
    },
  ]

  // Licenses template
  const makeLicenses = (price) => [
    { name: 'Personal', description: 'For learning and personal projects', price, features: 'Source code,Documentation,Community support' },
    { name: 'Commercial', description: 'For client and business use', price: Math.round(price * 2.5), features: 'Source code,Commercial license,Priority support,Lifetime updates' },
  ]

  // Clear existing data
  await prisma.favorite.deleteMany()
  await prisma.order.deleteMany()
  await prisma.license.deleteMany()
  await prisma.product.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.contactMessage.deleteMany()
  await prisma.fAQ.deleteMany()

  console.log('Eski data tozalandi...')

  // Insert products with licenses
  for (const product of products) {
    const created = await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        longDescription: product.longDescription,
        category: product.category,
        categoryPlatform: product.categoryPlatform,
        price: product.price,
        cover: product.cover,
        badges: product.badges,
        tags: product.tags,
        rating: product.rating,
        reviews: product.reviews,
        deliveryTime: product.deliveryTime,
        licenses: {
          create: makeLicenses(product.price),
        },
      },
    })
    console.log(`✅ ${created.name} yaratildi`)
  }

  // Insert blog posts
  for (const post of blogPosts) {
    const created = await prisma.blogPost.create({
      data: post,
    })
    console.log(`📝 ${created.title} yaratildi`)
  }

  // Insert FAQs
  for (const faq of faqs) {
    const created = await prisma.fAQ.create({
      data: faq,
    })
    console.log(`❓ ${created.question} yaratildi`)
  }

  console.log('\n🎉 Database muvaffaqiyatli to\'ldirildi!')
  console.log(`📦 ${products.length} ta mahsulot`)
  console.log(`📜 ${products.length * 2} ta litsenziya`)
  console.log(`📝 ${blogPosts.length} ta blog post`)
  console.log(`❓ ${faqs.length} ta FAQ`)
}

main()
  .catch((e) => {
    console.error('Xatolik:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
