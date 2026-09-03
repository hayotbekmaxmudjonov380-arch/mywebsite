import type { Metadata } from 'next'
import { ProductView } from '@/components/marketplace/route-views'
import { getProduct } from '@/lib/catalog'
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = await getProduct(slug); return { title: product?.name ?? 'Product' } }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <ProductView slug={(await params).slug} /> }
