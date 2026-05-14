import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function PostCard({ post }: { post: Post }) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const author = post.metadata?.author
  const categories = post.metadata?.categories
  const publishedDate = post.metadata?.published_date || post.created_at

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {featuredImage && (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.slice(0, 2).map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${getMetafieldValue(cat.metadata?.color) || '#0ea5e9'}20`,
                    color: getMetafieldValue(cat.metadata?.color) || '#0ea5e9',
                  }}
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
            {post.title}
          </h3>
          {excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">{excerpt}</p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            {author && <span>By {author.title}</span>}
            <time>{new Date(publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}