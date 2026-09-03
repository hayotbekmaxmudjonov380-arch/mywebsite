import { prisma } from './db'
import type { Category, Product } from './marketplace-types'

export const categories: Category[] = [
  { id: 'mobile', name: 'Mobile Apps', slug: 'mobile', description: 'iOS & Android products built for real users.', platform: 'mobile', icon: '▦', color: '#6b8cff' },
  { id: 'desktop', name: 'Desktop', slug: 'desktop', description: 'Native software for focused workflows.', platform: 'desktop', icon: '▣', color: '#9b8cff' },
  { id: 'web', name: 'Web Apps', slug: 'web', description: 'Production-ready web experiences.', platform: 'web', icon: '◈', color: '#55c7bd' },
  { id: 'telegram', name: 'Telegram', slug: 'telegram', description: 'Bots and mini apps for communities.', platform: 'telegram', icon: '➤', color: '#63a9e9' },
  { id: 'ai', name: 'AI Solutions', slug: 'ai', description: 'Intelligent tools that move ideas forward.', platform: 'ai', icon: '✦', color: '#d6b26e' },
  { id: 'business', name: 'Business Systems', slug: 'business', description: 'Systems that make operations flow.', platform: 'business', icon: '⌁', color: '#df7d84' },
  { id: 'institute', name: 'Institute Materials', slug: 'institute', description: 'Slides, documents, articles and coursework.', platform: 'institute', icon: '📎', color: '#e8945a' },
]

function mapProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    description: dbProduct.description,
    longDescription: dbProduct.longDescription,
    category: dbProduct.category,
    categoryPlatform: dbProduct.categoryPlatform,
    price: dbProduct.price,
    cover: dbProduct.cover,
    badges: dbProduct.badges ? dbProduct.badges.split(',') : [],
    tags: dbProduct.tags ? dbProduct.tags.split(',') : [],
    rating: dbProduct.rating,
    reviews: dbProduct.reviews,
    deliveryTime: dbProduct.deliveryTime || 'Instant download',
    licenses: dbProduct.licenses?.map((l: any) => ({
      id: l.name.toLowerCase(),
      name: l.name,
      description: l.description,
      price: l.price,
      features: l.features ? l.features.split(',') : [],
      deliverables: ['Full source code', l.name === 'Commercial' ? 'Commercial license' : 'Setup guide'],
    })) || [],
    gallery: [],
    features: [],
    techStack: [],
    isNew: dbProduct.badges?.includes('New') || false,
    isBestseller: dbProduct.badges?.includes('Bestseller') || false,
    isFeatured: dbProduct.badges?.includes('Featured') || false,
    customizationAvailable: true,
  }
}

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { licenses: true },
    orderBy: { createdAt: 'desc' },
  })
  return products.map(mapProduct)
}

export async function getProduct(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { licenses: true },
  })
  return product ? mapProduct(product) : null
}

export async function getProductsByCategory(platform: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { categoryPlatform: platform },
    include: { licenses: true },
    orderBy: { createdAt: 'desc' },
  })
  return products.map(mapProduct)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { badges: { contains: 'Featured' } },
    include: { licenses: true },
  })
  return products.map(mapProduct)
}

export async function getBestsellers(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { badges: { contains: 'Bestseller' } },
    include: { licenses: true },
  })
  return products.map(mapProduct)
}

export async function getNewProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { badges: { contains: 'New' } },
    include: { licenses: true },
  })
  return products.map(mapProduct)
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function formatPrice(price: number) {
  return `$${price}`
}

export const stats = [
  { value: '4.9/5', label: 'Average rating' },
  { value: '2,400+', label: 'Creators building' },
  { value: '48h', label: 'Average support reply' },
  { value: '100%', label: 'Source included' },
]

export const integrations = ['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'Figma']

export const texturePattern = 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.11) 1px, transparent 0)'

export const platformNames: Record<string, string> = { mobile: 'Mobile', desktop: 'Desktop', web: 'Web', telegram: 'Telegram', ai: 'AI', business: 'Business', institute: 'Institute' }
