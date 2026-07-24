import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import usePageMeta from '../hooks/usePageMeta.js'

export default function NotFoundPage() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/404/'
  usePageMeta({
    title: 'Page Not Found | DECENT Development',
    description: 'The requested page could not be found.',
    path,
    robots: 'noindex, nofollow',
  })

  return (
    <section className="flex min-h-[72vh] items-center bg-brand-bg py-28 text-brand-charcoal">
      <div className="section-shell">
        <p className="eyebrow text-brand-gold">404</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-normal leading-tight sm:text-7xl">Page not found</h1>
        <p className="mt-6 max-w-xl text-base font-light leading-7 text-brand-muted">
          The page may have moved or the address may be incorrect.
        </p>
        <Link
          to="/"
          className="focus-ring gold-gradient-btn mt-8 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
        >
          Return home
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
