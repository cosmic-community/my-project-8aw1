import Link from 'next/link'
import { getPosts, getCategories, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function HomePage() {
  const [posts, categories, authors] = await Promise.all([
    getPosts(),
    getCategories(),
    getAuthors(),
  ])

  const featuredPosts = posts.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-purple-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Welcome to <span className="text-brand-600">My Project</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover insightful articles, meet our talented authors, and explore content across diverse categories.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Browse Posts →
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Latest Posts</h2>
              <p className="text-gray-600 mt-2">Fresh content from our authors</p>
            </div>
            <Link href="/posts" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Categories</h2>
              <p className="text-gray-600 mt-2">Find content that interests you</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => {
                const color = getMetafieldValue(cat.metadata?.color) || '#0ea5e9'
                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="px-5 py-2.5 rounded-full font-medium text-sm transition-all hover:scale-105"
                    style={{
                      backgroundColor: `${color}15`,
                      color: color,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {cat.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Authors */}
      {authors.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet Our Authors</h2>
            <p className="text-gray-600 mt-2">The minds behind the content</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authors.slice(0, 8).map((author) => {
              const photo = author.metadata?.photo
              return (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="group text-center p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  {photo && (
                    <img
                      src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={author.title}
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                    />
                  )}
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {author.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}