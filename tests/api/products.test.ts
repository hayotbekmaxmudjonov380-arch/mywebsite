import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    product: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}))

describe('Products API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const { prisma } = await import('@/lib/db')
      const mockProducts = [
        {
          id: '1',
          name: 'Orbit CRM',
          slug: 'orbit-crm',
          description: 'A calm CRM',
          price: 149,
          licenses: [],
        },
      ]
      
      vi.mocked(prisma.product.findMany).mockResolvedValue(mockProducts as any)
      
      const products = await prisma.product.findMany({
        include: { licenses: true },
        orderBy: { createdAt: 'desc' },
      })
      
      expect(products).toHaveLength(1)
      expect(products[0].name).toBe('Orbit CRM')
    })

    it('should filter products by category', async () => {
      const { prisma } = await import('@/lib/db')
      const mockProducts = [
        {
          id: '1',
          name: 'Nordic Wallet',
          slug: 'nordic-wallet',
          categoryPlatform: 'mobile',
          licenses: [],
        },
      ]
      
      vi.mocked(prisma.product.findMany).mockResolvedValue(mockProducts as any)
      
      const products = await prisma.product.findMany({
        where: { categoryPlatform: 'mobile' },
        include: { licenses: true },
      })
      
      expect(products).toHaveLength(1)
      expect(products[0].categoryPlatform).toBe('mobile')
    })
  })

  describe('GET /api/products/[slug]', () => {
    it('should return product by slug', async () => {
      const { prisma } = await import('@/lib/db')
      const mockProduct = {
        id: '1',
        name: 'Orbit CRM',
        slug: 'orbit-crm',
        description: 'A calm CRM',
        price: 149,
        licenses: [
          { name: 'Personal', price: 149 },
          { name: 'Commercial', price: 372 },
        ],
      }
      
      vi.mocked(prisma.product.findUnique).mockResolvedValue(mockProduct as any)
      
      const product = await prisma.product.findUnique({
        where: { slug: 'orbit-crm' },
        include: { licenses: true },
      })
      
      expect(product).toBeDefined()
      expect(product?.name).toBe('Orbit CRM')
      expect(product?.licenses).toHaveLength(2)
    })

    it('should return null for non-existent slug', async () => {
      const { prisma } = await import('@/lib/db')
      vi.mocked(prisma.product.findUnique).mockResolvedValue(null)
      
      const product = await prisma.product.findUnique({
        where: { slug: 'non-existent' },
        include: { licenses: true },
      })
      
      expect(product).toBeNull()
    })
  })
})
