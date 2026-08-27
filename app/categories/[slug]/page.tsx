import { CategoryView } from '@/components/marketplace/route-views'
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <CategoryView slug={(await params).slug} /> }
