'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Eye, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  author: string
  category: string
  tags: string
  views: number
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [category])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      
      const response = await fetch(`/api/blog?${params}`)
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: null, label: 'Hammasi' },
    { value: 'tutorial', label: 'Qo\'llanmalar' },
    { value: 'news', label: 'Yangiliklar' },
    { value: 'tips', label: 'Maslahatlar' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-zinc-400 text-lg">
            Yangiliklar, qo'llanmalar va maslahatlar
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value || 'all'}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                category === cat.value
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-900 rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-zinc-800 rounded-lg mb-4" />
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-zinc-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">Hozircha maqolalar yo'q</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition-colors"
              >
                {post.coverImage && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                    <span className="bg-zinc-800 px-2 py-1 rounded text-xs">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.createdAt).toLocaleDateString('uz-UZ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {post.views}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="flex items-center gap-1 text-blue-400 text-sm group-hover:gap-2 transition-all">
                    O'qish <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
