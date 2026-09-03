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

  console.log('\n🎉 Database muvaffaqiyatli to\'ldirildi!')
  console.log(`📦 ${products.length} ta mahsulot`)
  console.log(`📜 ${products.length * 2} ta litsenziya`)
}

main()
  .catch((e) => {
    console.error('Xatolik:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
