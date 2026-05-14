export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} My Project. Powered by Cosmic.</p>
      </div>
    </footer>
  )
}