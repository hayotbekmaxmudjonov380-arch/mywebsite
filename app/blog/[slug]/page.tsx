'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Eye, ArrowLeft, User } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string | null
  author: string
  category: string
  tags: string
  views: number
  createdAt: string
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const fetchPost = async (slug: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blog/${slug}`)
      
      if (!response.ok) {
        throw new Error('Post not found')
      }
      
      const data = await response.json()
      setPost(data)
    } catch (err) {
      setError('Maqola topilmadi')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400 text-lg">{error || 'Maqola topilmadi'}</p>
        <Link
          href="/blog"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft size={16} />
          Blogga qaytish
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Blogga qaytish
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
            <span className="bg-zinc-800 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.createdAt).toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {post.views} marta ko'rilgan
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-2 text-zinc-400">
            <User size={16} />
            <span>{post.author}</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <div className="flex flex-wrap gap-2">
              {post.tags.split(',').map((tag, i) => (
                <span
                  key={i}
                  className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
