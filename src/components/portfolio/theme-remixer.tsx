'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Palette, RotateCcw, X } from 'lucide-react'

const DEFAULT_HUE = 205
const DEFAULT_ACCENT = 50

export function applyTheme(hue: number, accentHue = DEFAULT_ACCENT) {
  const r = document.documentElement
  r.style.setProperty('--primary', `oklch(0.8 0.14 ${hue})`)
  r.style.setProperty('--ring', `oklch(0.8 0.14 ${hue})`)
  r.style.setProperty('--accent', `oklch(0.72 0.15 ${accentHue})`)
  r.style.setProperty('--theme-hue', String(hue))
  r.style.setProperty('--theme-accent-hue', String(accentHue))
}

export function ThemeRemixer() {
  const [open, setOpen] = useState(false)
  const [hue, setHue] = useState(DEFAULT_HUE)
  const [accent, setAccent] = useState(DEFAULT_ACCENT)

  useEffect(() => {
    applyTheme(hue, accent)
  }, [hue, accent])

  useEffect(() => {
    const onTheme = (e: Event) => {
      const detail = (e as CustomEvent<{ hue?: number; accent?: number }>).detail
      if (detail?.hue != null) setHue(detail.hue)
      if (detail?.accent != null) setAccent(detail.accent)
    }
    window.addEventListener('remix-theme', onTheme as EventListener)
    return () =>
      window.removeEventListener('remix-theme', onTheme as EventListener)
  }, [])

  return (
    <div className="fixed bottom-5 left-5 z-[90]">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="glass w-64 rounded-2xl p-4 shadow-2xl shadow-black/40 ring-1 ring-primary/20"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  Live theme
                </p>
                <p className="font-heading text-sm font-semibold">Remix</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close theme remixer"
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <Slider
              label="Primary"
              value={hue}
              onChange={setHue}
              swatch={`oklch(0.8 0.14 ${hue})`}
            />
            <div className="mt-3">
              <Slider
                label="Accent"
                value={accent}
                onChange={setAccent}
                swatch={`oklch(0.72 0.15 ${accent})`}
              />
            </div>
            <button
              onClick={() => {
                setHue(DEFAULT_HUE)
                setAccent(DEFAULT_ACCENT)
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-glass-border bg-secondary/40 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
            <p className="mt-2 font-mono text-[9px] leading-relaxed text-muted-foreground/70">
              Powered by CSS oklch() — every accent re-flows in real time.
            </p>
          </motion.div>
        ) : (
          <motion.button
            key="btn"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => setOpen(true)}
            aria-label="Open live theme remixer"
            className="glass flex size-11 items-center justify-center rounded-full shadow-2xl shadow-black/40 ring-1 ring-primary/20 transition-transform hover:scale-105"
          >
            <Palette className="size-4 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function Slider({
  label,
  value,
  onChange,
  swatch,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  swatch: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
        <span
          aria-hidden="true"
          className="inline-block size-3 rounded-full ring-1 ring-glass-border"
          style={{ background: swatch }}
        />
      </span>
      <input
        type="range"
        min={0}
        max={360}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="hue-slider w-full"
        aria-label={`${label} hue`}
      />
    </label>
  )
}