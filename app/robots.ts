import { SITE_URL } from '@/lib/stripe'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/account/', '/api/', '/checkout/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
