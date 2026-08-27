const AB_STUDIO_URL = 'https://www.abwebstudio.com.au/'

export default function ABDeveloperCredit() {
  return (
    <div className="border-t border-brand-gold/15 px-5 pt-6 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Designed &amp; Developed by
        </p>

        <a
          className="focus-ring group inline-flex min-h-11 items-center gap-2 rounded-sm text-brand-gold/75 transition-opacity duration-300 hover:text-brand-gold hover:opacity-100"
          href={AB_STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit AB Digital Solutions"
        >
          <img
            src="/branding/ab-digital-solutions-watermark.webp"
            alt=""
            width="672"
            height="309"
            className="h-auto w-[clamp(8.5rem,18vw,10.625rem)] object-contain opacity-90 transition-transform duration-300 group-hover:-translate-y-0.5"
            decoding="async"
          />
          <span
            aria-hidden="true"
            className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      </div>
    </div>
  )
}
