interface ProductLDProps {
  name: string
  description: string
  url: string
  image?: string
  price: number
  currency?: string
  rating?: number
  reviewCount?: number
}

export function ProductLD({
  name,
  description,
  url,
  image,
  price,
  currency = 'USD',
  rating,
  reviewCount,
}: ProductLDProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    image: image || `${url}/og-image.png`,
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price,
      availability: 'https://schema.org/InStock',
    },
    ...(rating && reviewCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating,
            reviewCount,
          },
        }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface OrganizationLDProps {
  name: string
  url: string
  logo?: string
}

export function OrganizationLD({ name, url, logo }: OrganizationLDProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo ? { logo } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface WebsiteLDProps {
  name: string
  url: string
  description?: string
}

export function WebsiteLD({ name, url, description }: WebsiteLDProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    ...(description ? { description } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbLDProps {
  items: Array<{ name: string; url: string }>
}

export function BreadcrumbLD({ items }: BreadcrumbLDProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
