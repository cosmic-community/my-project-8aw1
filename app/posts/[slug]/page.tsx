// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost, getMetafieldValue } from '@/lib/cosmic'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const content = getMetafieldValue(post.metadata?.content)
  const author = post.metadata?.author
  const categories = post.metadata?.categories
  const publishedDate = post.metadata?.published_date || post.created_at

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="text-sm font-medium px-3 py-1 rounded-full transition-colors"
              style={{
                backgroundColor: `${getMetafieldValue(cat.metadata?.color) || '#0ea5e9'}20`,
                color: getMetafieldValue(cat.metadata?.color) || '#0ea5e9',
              }}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
        {author && (
          <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 group">
            {author.metadata?.photo && (
              <img
                src={`${author.metadata.photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                alt={author.title}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                {author.title}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </Link>
        )}
      </div>

      {featuredImage && (
        <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-10 bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {content && (
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link href="/posts" className="text-brand-600 hover:text-brand-700 font-medium">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}