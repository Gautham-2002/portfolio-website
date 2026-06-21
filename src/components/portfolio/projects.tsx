'use client'

import { type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/portfolio/brand-icons'
import { type Project, projects } from '@/lib/data'
import { SectionHeading } from '@/components/portfolio/section'
import { cn } from '@/lib/utils'

function TiltCard({ project, delay }: { project: Project; delay: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 18,
  })

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 [perspective:1000px]',
        project.accent ? 'bg-primary text-primary-foreground' : 'glass',
        project.span === 'wide' && 'sm:col-span-2',
        project.span === 'tall' && 'sm:row-span-2',
      )}
    >
      {/* hover glow */}
      <div
        className={cn(
          'pointer-events-none absolute -right-10 -top-10 size-40 rounded-full blur-3xl transition-opacity duration-500',
          project.accent
            ? 'bg-primary-foreground/20 opacity-100'
            : 'bg-primary/20 opacity-0 group-hover:opacity-100',
        )}
      />

      <div style={{ transform: 'translateZ(40px)' }}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-xl font-semibold leading-tight sm:text-2xl">
            {project.title}
          </h3>
          <ArrowUpRight
            className={cn(
              'size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
              project.accent ? 'opacity-80' : 'text-primary',
            )}
          />
        </div>
        <p
          className={cn(
            'mt-3 text-pretty text-sm leading-relaxed',
            project.accent ? 'text-primary-foreground/80' : 'text-muted-foreground',
          )}
        >
          {project.description}
        </p>
      </div>

      <div
        style={{ transform: 'translateZ(30px)' }}
        className="mt-6 flex flex-wrap items-center gap-2"
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              'rounded-lg px-2.5 py-1 font-mono text-[11px]',
              project.accent
                ? 'bg-primary-foreground/15 text-primary-foreground'
                : 'border border-border bg-secondary/50 text-muted-foreground',
            )}
          >
            {tag}
          </span>
        ))}
        {(project.github || project.demo) && (
          <div className="ml-auto flex items-center gap-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg transition-colors',
                  project.accent
                    ? 'bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25'
                    : 'border border-border bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                <GithubIcon className="size-3.5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg transition-colors',
                  project.accent
                    ? 'bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25'
                    : 'border border-border bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="04 / Selected Work"
        title="Things I've built."
        subtitle="A mix of high-scale backend systems, AI tooling, and frontend performance work."
      />

      <div className="grid auto-rows-[minmax(180px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <TiltCard key={project.title} project={project} delay={i * 0.05} />
        ))}
      </div>
    </section>
  )
}
