'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'motion/react'
import { profile, stats } from '@/lib/data'
import { Reveal, SectionHeading } from '@/components/portfolio/section'

function NumberTicker({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [inView, value, count])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="01 / About" title="Engineer, end to end." />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="text-pretty text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            {profile.summary.split('. ').slice(0, 2).join('. ')}.
          </p>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            From <span className="text-foreground">Go concurrency patterns</span> and{' '}
            <span className="text-foreground">Kafka pipelines</span> to{' '}
            <span className="text-foreground">RAG + agentic LLM workflows</span> and{' '}
            <span className="text-foreground">sub-100ms React frontends</span> — I care about the
            whole stack and the details that make it feel fast.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <motion.div key={s.label} whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
                <div className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  <NumberTicker value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
