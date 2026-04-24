import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col items-center gap-3 border-t border-gray-200 py-4 sm:flex-row sm:justify-between dark:border-gray-800">
        <span className="text-xs tracking-widest text-gray-400 uppercase dark:text-gray-500">
          © {new Date().getFullYear()} {siteMetadata.headerTitle}
        </span>
      </div>
    </footer>
  )
}
