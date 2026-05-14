import Link from 'next/link'
import type { Page } from '@/types'

export default function Header({ pages }: { pages: Page[] }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-brand-600 transition-colors">
          📚 My Project
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/posts" className="text-gray-600 hover:text-gray-900 transition-colors">
            Posts
          </Link>
          <Link href="/authors" className="text-gray-600 hover:text-gray-900 transition-colors">
            Authors
          </Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-900 transition-colors">
            Categories
          </Link>
          {pages.slice(0, 3).map((page) => (
            <Link
              key={page.id}
              href={`/pages/${page.slug}`}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}