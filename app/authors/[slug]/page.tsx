// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthor, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const photo = author.metadata?.photo
  const bio = getMetafieldValue(author.metadata?.bio)
  const email = getMetafieldValue(author.metadata?.email)
  const twitter = getMetafieldValue(author.metadata?.twitter)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        {photo && (
          <img
            src={`${photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
            alt={author.title}
            width={160}
            height={160}
            className="w-40 h-40 rounded-full mx-auto mb-6 object-cover"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{author.title}</h1>
        {bio && <p className="text-gray-600 text-lg leading-relaxed mb-6">{bio}</p>}
        <div className="flex items-center justify-center gap-4 text-sm">
          {email && (
            <a href={`mailto:${email}`} className="text-brand-600 hover:text-brand-700 font-medium">
              ✉ {email}
            </a>
          )}
          {twitter && (
            <a
              href={`https://twitter.com/${twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              🐦 @{twitter.replace('@', '')}
            </a>
          )}
        </div>
      </div>

      {posts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Posts by {author.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-100 text-center">
        <Link href="/authors" className="text-brand-600 hover:text-brand-700 font-medium">
          ← Back to all authors
        </Link>
      </div>
    </div>
  )
}