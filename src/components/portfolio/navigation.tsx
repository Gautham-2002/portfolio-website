'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Home, User, Cpu, Briefcase, FolderGit2, Sparkles, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'playground', label: 'CSS Lab', icon: Sparkles },
  { id: 'contact', label: 'Contact', icon: Send },
]

export function Navigation() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
      aria-label="Primary"
    >
      <ul className="glass flex items-center gap-1 rounded-full p-1.5 shadow-2xl shadow-black/40">
        {links.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'group relative flex size-10 items-center justify-center rounded-full transition-colors sm:size-11',
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 size-[18px]" />
                <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md glass px-2 py-1 text-[11px] font-medium opacity-0 transition-opacity group-hover:opacity-100">
                  {label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
