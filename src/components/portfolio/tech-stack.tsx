'use client'

import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { skillGroups } from '@/lib/data'
import { Reveal, SectionHeading } from '@/components/portfolio/section'

const TechGlobe = lazy(() =>
  import('@/components/portfolio/tech-globe').then((m) => ({ default: m.TechGlobe })),
)

export function TechStack() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02 / Toolbox"
          title="The stack I reach for."
          subtitle="Polyglot by habit — typed Python and concurrent Go on the backend, performant React on the front, with AI orchestration in between. Drag the globe to spin through the toolbox."
        />

        {/* 3D rotating tech globe */}
        <Reveal>
          <div className="glass mb-10 rounded-3xl p-2 sm:p-4">
            <Suspense
              fallback={
                <div className="flex h-[420px] items-center justify-center font-mono text-xs text-muted-foreground">
                  loading tech globe…
                </div>
              }
            >
              <TechGlobe />
            </Suspense>
          </div>
        </Reveal>

        {/* skill group cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass h-full rounded-2xl p-6 transition-colors hover:border-primary/40"
              >
                <h3 className="mb-4 font-heading text-lg font-semibold">{group.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
