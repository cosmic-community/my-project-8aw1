// app/pages/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPage, getMetafieldValue } from '@/lib/cosmic'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return { title: 'Page Not Found' }

  return {
    title: getMetafieldValue(page.metadata?.seo_title) || page.title,
    description: getMetafieldValue(page.metadata?.seo_description),
  }
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  const heroImage = page.metadata?.hero_image
  const content = getMetafieldValue(page.metadata?.content)

  return (
    <article>
      {heroImage && (
        <div className="w-full aspect-[21/9] max-h-[500px] overflow-hidden bg-gray-100">
          <img
            src={`${heroImage.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
            alt={page.title}
            width={1200}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 text-center">
          {page.title}
        </h1>

        {content && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </article>
  )
}