import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function IntroAnimation({ logo }) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false

    try {
      return window.sessionStorage.getItem('decent-development-intro') !== 'seen'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!visible) return undefined

    const timer = window.setTimeout(
      () => {
        try {
          window.sessionStorage.setItem('decent-development-intro', 'seen')
        } catch {
          // Storage can be unavailable in hardened browser contexts.
        }

        setVisible(false)
      },
      reducedMotion ? 350 : 2500,
    )

    return () => window.clearTimeout(timer)
  }, [reducedMotion, visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.45, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <motion.div
            className="architecture-grid absolute inset-0 opacity-50"
            initial={reducedMotion ? false : { opacity: 0, backgroundPosition: '0px 0px' }}
            animate={reducedMotion ? undefined : { opacity: 0.5, backgroundPosition: '46px 46px' }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute left-0 top-1/2 h-px w-full bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 1.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute h-[340px] w-[340px] border border-gold/25 sm:h-[480px] sm:w-[480px]"
            initial={{ opacity: 0, rotate: 0, scale: 0.94 }}
            animate={{ opacity: 1, rotate: 45, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 1.1, ease: 'easeOut' }}
          />
          <motion.div
            className="relative z-10 flex flex-col items-center text-center"
            initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.35, duration: reducedMotion ? 0.01 : 0.7 }}
          >
            {logo ? (
              <motion.div
                className="logo-frame mb-7 h-[110px] w-[min(42vw,150px)] sm:h-[142px] sm:w-[184px]"
                initial={reducedMotion ? false : { scale: 0.94 }}
                animate={reducedMotion ? undefined : { scale: 1.035 }}
                transition={{ delay: 0.45, duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={logo}
                  alt="DECENT Development logo"
                  className="h-full w-full object-contain"
                  decoding="async"
                />
              </motion.div>
            ) : (
              <div className="mb-5 grid h-16 w-16 place-items-center border border-gold/50 bg-gold/10 font-display text-2xl font-bold text-gold">
                DD
              </div>
            )}
            <p className="font-display text-3xl font-semibold text-ivory sm:text-5xl">
              DECENT Development
            </p>
            <div className="mt-6 h-px w-44 bg-gold" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
