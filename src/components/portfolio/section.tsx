'use client'

import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  index,
  title,
  subtitle,
  className,
}: {
  index: string
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn('mb-12 flex flex-col gap-3', className)}>
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{index}</span>
      <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
