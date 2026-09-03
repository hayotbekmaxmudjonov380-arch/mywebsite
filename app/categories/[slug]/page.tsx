import type { Metadata } from 'next'
import { CategoryView } from '@/components/marketplace/route-views'
import { getCategory } from '@/lib/catalog'
import { SITE_URL } from '@/lib/stripe'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)

  if (!category) {
    return {
      title: 'Category not found',
      description: 'The category you are looking for does not exist.',
    }
  }

  const categoryUrl = `${SITE_URL}/categories/${category.slug}`

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      url: categoryUrl,
      siteName: 'itshopping',
      images: [
        {
          url: `${SITE_URL}/og-category.png`,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: category.description,
      images: [`${SITE_URL}/og-category.png`],
    },
    alternates: {
      canonical: categoryUrl,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CategoryView slug={(await params).slug} />
}
