// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategory, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const color = getMetafieldValue(category.metadata?.color) || '#0ea5e9'
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div
        className="rounded-3xl p-10 md:p-16 text-center mb-12"
        style={{ backgroundColor: `${color}15` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: color }}>
          {category.title}
        </h1>
        {description && (
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No posts in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-100 text-center">
        <Link href="/categories" className="text-brand-600 hover:text-brand-700 font-medium">
          ← Back to all categories
        </Link>
      </div>
    </div>
  )
}