'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { experiences } from '@/lib/data'
import { Reveal, SectionHeading } from '@/components/portfolio/section'

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 70%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        index="03 / Experience"
        title="Where I've shipped."
        subtitle="Three years across high-scale platforms, performance overhauls, and AI-driven tooling."
      />

      <div ref={ref} className="relative pl-8 sm:pl-12">
        {/* track */}
        <div className="absolute left-[7px] top-2 h-full w-px bg-border sm:left-[15px]" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-[7px] top-2 h-full w-px origin-top bg-primary sm:left-[15px]"
        />

        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <Reveal key={`${exp.company}-${exp.period}`} delay={i * 0.05}>
              <div className="relative">
                <span className="absolute -left-8 top-1.5 flex size-4 items-center justify-center rounded-full border border-primary bg-background sm:-left-12">
                  <span className="size-2 rounded-full bg-primary" />
                </span>

                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl font-semibold">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-primary">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {exp.company} · {exp.location}
                  </p>

                  <ul className="mt-4 flex flex-col gap-2.5">
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
