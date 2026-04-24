import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200">
      <div className="flex flex-col items-center gap-3 border-t border-gray-200 py-4 sm:flex-row sm:justify-between">
        <span className="text-xs tracking-widest text-gray-400 uppercase">
          © {new Date().getFullYear()} {siteMetadata.headerTitle}
        </span>
      </div>
    </footer>
  )
}
