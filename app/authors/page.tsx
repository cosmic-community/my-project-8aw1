import Link from 'next/link'
import { getAuthors, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Authors | My Project',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Our Authors</h1>
        <p className="text-gray-600 text-lg">Meet the talented writers behind our content</p>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No authors yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => {
            const photo = author.metadata?.photo
            const bio = getMetafieldValue(author.metadata?.bio)
            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  {photo && (
                    <img
                      src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={author.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {author.title}
                  </h2>
                </div>
                {bio && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{bio}</p>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}