import type { Category, Product } from './marketplace-types'

export const categories: Category[] = [
  { id: 'mobile', name: 'Mobile Apps', slug: 'mobile', description: 'iOS & Android products built for real users.', platform: 'mobile', icon: '▦', color: '#6b8cff' },
  { id: 'desktop', name: 'Desktop', slug: 'desktop', description: 'Native software for focused workflows.', platform: 'desktop', icon: '▣', color: '#9b8cff' },
  { id: 'web', name: 'Web Apps', slug: 'web', description: 'Production-ready web experiences.', platform: 'web', icon: '◈', color: '#55c7bd' },
  { id: 'telegram', name: 'Telegram', slug: 'telegram', description: 'Bots and mini apps for communities.', platform: 'telegram', icon: '➤', color: '#63a9e9' },
  { id: 'ai', name: 'AI Solutions', slug: 'ai', description: 'Intelligent tools that move ideas forward.', platform: 'ai', icon: '✦', color: '#d6b26e' },
  { id: 'business', name: 'Business Systems', slug: 'business', description: 'Systems that make operations flow.', platform: 'business', icon: '⌁', color: '#df7d84' },
]

const license = (price: number): Product['licenses'] => [
  { id: 'personal', name: 'Personal', description: 'For learning and personal projects', price, features: ['Source code', 'Documentation', 'Community support'], deliverables: ['Full source code', 'Setup guide'] },
  { id: 'commercial', name: 'Commercial', description: 'For client and business use', price: Math.round(price * 2.5), features: ['Source code', 'Commercial license', 'Priority support', 'Lifetime updates'], deliverables: ['Full source code', 'Commercial license', 'Priority support'] },
]

export const products: Product[] = [
  { id: 'orbit-crm', name: 'Orbit CRM', slug: 'orbit-crm', description: 'A calm, modern CRM for teams that want to move fast.', longDescription: 'Orbit brings contacts, deals, and conversations into one thoughtful workspace. Built for modern teams who need clarity without the enterprise bloat.', category: 'Business Systems', categoryPlatform: 'business', price: 149, licenses: license(149), rating: 4.9, reviews: 42, tags: ['CRM', 'SaaS', 'Dashboard'], badges: ['Bestseller', 'Production Ready'], cover: 'linear-gradient(135deg, #182444 0%, #0c1428 55%, #151b36 100%)', gallery: [], features: ['Pipeline management', 'Team permissions', 'Activity timeline', 'Analytics dashboard'], techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'], isNew: false, isBestseller: true, isFeatured: true, deliveryTime: 'Instant download', customizationAvailable: true },
  { id: 'lumina-ai', name: 'Lumina AI', slug: 'lumina-ai', description: 'Your team’s intelligent workspace for better decisions.', longDescription: 'Lumina turns scattered knowledge into a searchable, useful layer for your team. Ask questions, summarize documents, and keep momentum.', category: 'AI Solutions', categoryPlatform: 'ai', price: 199, licenses: license(199), rating: 4.8, reviews: 28, tags: ['AI', 'Knowledge Base', 'RAG'], badges: ['New', 'AI Ready'], cover: 'linear-gradient(135deg, #282419 0%, #17140f 45%, #233328 100%)', gallery: [], features: ['Semantic search', 'Document ingestion', 'Team workspaces', 'AI assistant'], techStack: ['Next.js', 'AI SDK', 'OpenAI', 'Vector DB'], isNew: true, isBestseller: false, isFeatured: true, deliveryTime: 'Instant download', customizationAvailable: true },
  { id: 'nordic-wallet', name: 'Nordic Wallet', slug: 'nordic-wallet', description: 'A beautifully simple finance app for everyday clarity.', longDescription: 'Nordic Wallet gives people a clearer view of their money through quiet design, useful automation, and an interface that feels good to return to.', category: 'Mobile Apps', categoryPlatform: 'mobile', price: 89, licenses: license(89), rating: 4.7, reviews: 19, tags: ['Fintech', 'iOS', 'Android'], badges: ['Mobile'], cover: 'linear-gradient(135deg, #1d2946 0%, #111c32 58%, #292d4b 100%)', gallery: [], features: ['Budget tracking', 'Smart categories', 'Spending insights', 'Biometric lock'], techStack: ['React Native', 'Expo', 'TypeScript'], isNew: false, isBestseller: true, isFeatured: false, deliveryTime: 'Instant download', customizationAvailable: false },
  { id: 'flowbot', name: 'Flowbot', slug: 'flowbot', description: 'A Telegram bot that turns conversations into workflows.', longDescription: 'Flowbot automates the repetitive parts of community management and support without making your team learn a new system.', category: 'Telegram', categoryPlatform: 'telegram', price: 79, licenses: license(79), rating: 4.9, reviews: 31, tags: ['Telegram', 'Automation', 'Bot'], badges: ['Bestseller'], cover: 'linear-gradient(135deg, #172a37 0%, #0e1a2a 58%, #143839 100%)', gallery: [], features: ['Command builder', 'Moderation tools', 'Scheduled messages', 'Analytics'], techStack: ['Node.js', 'Telegram API', 'Redis'], isNew: false, isBestseller: true, isFeatured: false, deliveryTime: 'Instant download', customizationAvailable: true },
  { id: 'studio-os', name: 'Studio OS', slug: 'studio-os', description: 'The operating system for your creative business.', longDescription: 'A focused workspace for briefs, projects, clients, and invoices. Studio OS gives independent teams the structure to do their best work.', category: 'Web Apps', categoryPlatform: 'web', price: 129, licenses: license(129), rating: 4.6, reviews: 16, tags: ['Workspace', 'Projects', 'Web App'], badges: ['New'], cover: 'linear-gradient(135deg, #182f35 0%, #101d2b 58%, #263a39 100%)', gallery: [], features: ['Project spaces', 'Client portal', 'Invoices', 'Time tracking'], techStack: ['Next.js', 'Supabase', 'Resend'], isNew: true, isBestseller: false, isFeatured: false, deliveryTime: 'Instant download', customizationAvailable: true },
  { id: 'pixel-engine', name: 'Pixel Engine', slug: 'pixel-engine', description: 'A polished desktop toolkit for visual asset systems.', longDescription: 'Pixel Engine helps design teams create, organize, and export consistent visual assets at speed.', category: 'Desktop', categoryPlatform: 'desktop', price: 109, licenses: license(109), rating: 4.8, reviews: 12, tags: ['Desktop', 'Design Tools', 'Assets'], badges: ['Production Ready'], cover: 'linear-gradient(135deg, #292143 0%, #171528 58%, #202e4b 100%)', gallery: [], features: ['Asset libraries', 'Batch exports', 'Smart templates', 'Team sync'], techStack: ['Electron', 'React', 'TypeScript'], isNew: false, isBestseller: false, isFeatured: false, deliveryTime: 'Instant download', customizationAvailable: false },
]

export const featuredProducts = products.filter((product) => product.isFeatured)
export const newProducts = products.filter((product) => product.isNew)
export const bestsellers = products.filter((product) => product.isBestseller)
export function getProduct(slug: string) { return products.find((product) => product.slug === slug) }
export function getCategory(slug: string) { return categories.find((category) => category.slug === slug) }
export function getProductsByCategory(platform: string) { return products.filter((product) => product.categoryPlatform === platform) }
export function formatPrice(price: number) { return `$${price}` }

export const stats = [
  { value: '4.9/5', label: 'Average rating' },
  { value: '2,400+', label: 'Creators building' },
  { value: '48h', label: 'Average support reply' },
  { value: '100%', label: 'Source included' },
]

export const integrations = ['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'Figma']

export const texturePattern = 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.11) 1px, transparent 0)'

export const platformNames: Record<string, string> = { mobile: 'Mobile', desktop: 'Desktop', web: 'Web', telegram: 'Telegram', ai: 'AI', business: 'Business' }
