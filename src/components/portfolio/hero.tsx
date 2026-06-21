'use client'

import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { ArrowDownRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/portfolio/brand-icons'
import { profile } from '@/lib/data'

const HeroScene = lazy(() =>
  import('@/components/portfolio/hero-scene').then((m) => ({ default: m.HeroScene })),
)

const HeroSceneFallback = () => (
  <div className="absolute inset-0 animate-aurora rounded-full bg-[radial-gradient(circle_at_center,oklch(0.8_0.14_205/0.35),transparent_60%)] blur-3xl" />
)

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-overlay animate-grid-pan opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-[radial-gradient(circle_at_center,oklch(0.8_0.14_205/0.22),transparent_65%)] blur-3xl" />

      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        {mounted ? (
          <Suspense fallback={<HeroSceneFallback />}>
            <HeroScene />
          </Suspense>
        ) : (
          <HeroSceneFallback />
        )}
      </div>

      {/* legibility vignette — keeps the headline readable over the bright 3D core */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_60%_48%_at_center,oklch(0.14_0.018_256/0.96),oklch(0.14_0.018_256/0.78)_45%,oklch(0.14_0.018_256/0.35)_70%,transparent_85%)]" />

      {/* content overlay */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          Available for work
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-5xl text-balance font-heading text-5xl font-bold leading-[0.95] tracking-tight [text-shadow:0_2px_24px_oklch(0.1_0.02_256/0.95),0_0_60px_oklch(0.1_0.02_256/0.8)] sm:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">Gautham</span>
          <br />
          <span className="text-foreground">Gokulakonda</span>
          <span className="sr-only"> — Senior Software Engineer</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {profile.role} crafting <span className="text-foreground">scalable backends</span>,{' '}
          <span className="text-foreground">AI systems</span>, and{' '}
          <span className="text-foreground">pixel-precise frontends</span>.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="magnetic group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            View my work
            <ArrowDownRight className="size-4 transition-transform group-hover:rotate-45" />
          </a>
          <div className="glass flex items-center gap-1 rounded-full p-1">
            {[
              { href: profile.github, icon: GithubIcon, label: 'GitHub' },
              { href: profile.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
              { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:block"
      >
        Scroll to explore
      </motion.div>
    </section>
  )
}
