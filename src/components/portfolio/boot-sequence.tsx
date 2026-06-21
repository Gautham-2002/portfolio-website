'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const LINES = [
  '> booting portfolio.gautham …',
  '> mounting /projects ……… ok',
  '> linking /experience …… ok',
  '> loading 3D core ……… 100%',
  '> hydrating react ……… ready',
  '> tip: press ~ for terminal · ▲▲▼▼◀▶◀▶ B A for arcade',
  '> launching ✓',
]

export function BootSequence() {
  const [done, setDone] = useState(true)
  const [shown, setShown] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('boot-seen')) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('boot-seen', '1')
      return
    }
    sessionStorage.setItem('boot-seen', '1')
    setDone(false)
    let i = 0
    const tick = window.setInterval(() => {
      setShown((s) => [...s, LINES[i]])
      i++
      if (i >= LINES.length) {
        window.clearInterval(tick)
        window.setTimeout(() => setDone(true), 380)
      }
    }, 180)
    const skip = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') setDone(true)
    }
    window.addEventListener('keydown', skip)
    return () => {
      window.clearInterval(tick)
      window.removeEventListener('keydown', skip)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          onClick={() => setDone(true)}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
          <div className="relative w-full max-w-md px-6 font-mono text-[12px] leading-relaxed text-primary sm:text-sm">
            <div className="mb-3 flex items-center gap-2 text-muted-foreground">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em]">
                gautham.os · v2026
              </span>
            </div>
            {shown.map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  i === LINES.length - 1
                    ? 'text-foreground'
                    : 'text-primary/90'
                }
              >
                {l}
              </motion.p>
            ))}
            <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-primary" />
            <p className="absolute bottom-0 right-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
              press esc to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}