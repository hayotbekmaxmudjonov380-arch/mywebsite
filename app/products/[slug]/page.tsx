import type { Metadata } from 'next'
import { ProductView } from '@/components/marketplace/route-views'
import { getProduct } from '@/lib/catalog'
import { SITE_URL } from '@/lib/stripe'
import { ProductLD } from '@/components/seo/json-ld'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Product not found',
      description: 'The product you are looking for does not exist.',
    }
  }

  const productUrl = `${SITE_URL}/products/${product.slug}`

  return {
    title: product.name,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      title: product.name,
      description: product.description,
      url: productUrl,
      siteName: 'itshopping',
      images: [
        {
          url: `${SITE_URL}/og-product.png`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [`${SITE_URL}/og-product.png`],
    },
    alternates: {
      canonical: productUrl,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  return (
    <>
      {product && (
        <ProductLD
          name={product.name}
          description={product.description}
          url={`${SITE_URL}/products/${product.slug}`}
          price={product.price}
          rating={product.rating}
          reviewCount={product.reviews}
        />
      )}
      <ProductView slug={slug} />
    </>
  )
}
