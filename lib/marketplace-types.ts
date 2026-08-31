export type Platform = 'mobile' | 'desktop' | 'web' | 'telegram' | 'ai' | 'business' | 'institute'

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  platform: Platform
  icon: string
  color: string
}

export interface License {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  deliverables: string[]
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  category: string
  categoryPlatform: Platform
  price: number
  licenses: License[]
  rating: number
  reviews: number
  tags: string[]
  badges: string[]
  cover: string
  gallery: string[]
  features: string[]
  techStack: string[]
  isNew: boolean
  isBestseller: boolean
  isFeatured: boolean
  deliveryTime: string
  customizationAvailable: boolean
}

export interface CartItem {
  productId: string
  licenseId?: string
  quantity: number
  addedAt: Date
}

export interface FilterState {
  platform?: Platform
  priceMin?: number
  priceMax?: number
  searchQuery?: string
  sortBy?: 'newest' | 'popular' | 'price-low' | 'price-high' | 'rating'
  badges?: string[]
}
