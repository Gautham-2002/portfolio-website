'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Gamepad2, X } from 'lucide-react'

export function ArcadeChip() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 2200)
    return () => {
      window.clearTimeout(t)
    }
  }, [])

  const open = () => window.dispatchEvent(new Event('open-arcade'))

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="fixed bottom-20 right-3 z-[90] sm:bottom-5 sm:right-5"
        >
          <div className="glass group relative flex items-center gap-2 rounded-full py-2 pl-3 pr-2 shadow-2xl shadow-black/40 ring-1 ring-primary/20">
            <button
              onClick={open}
              className="flex items-center gap-2.5 text-sm"
              aria-label="Open hidden Snake arcade"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Gamepad2 className="size-3.5" />
              </span>
              <span className="text-[13px] font-medium text-foreground">
                Bored? Play a game{' '}
                <span className="text-primary transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </button>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
