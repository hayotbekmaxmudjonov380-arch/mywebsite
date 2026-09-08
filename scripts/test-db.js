const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  try {
    await prisma.$connect()
    console.log('Database connected successfully!')
    
    // Test query
    const count = await prisma.product.count()
    console.log(`Products in database: ${count}`)
    
  } catch (error) {
    console.error('Connection error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()
