import Link from 'next/link'
import { getCategories, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Categories | My Project',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Categories</h1>
        <p className="text-gray-600 text-lg">Explore content by topic</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No categories yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const color = getMetafieldValue(cat.metadata?.color) || '#0ea5e9'
            const description = getMetafieldValue(cat.metadata?.description)
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group p-8 rounded-2xl border-2 hover:shadow-xl transition-all hover:-translate-y-1"
                style={{
                  borderColor: `${color}30`,
                  backgroundColor: `${color}08`,
                }}
              >
                <h2
                  className="text-2xl font-bold mb-3 transition-colors"
                  style={{ color: color }}
                >
                  {cat.title}
                </h2>
                {description && (
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}