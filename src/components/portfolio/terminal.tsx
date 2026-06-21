'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { TerminalSquare, X } from 'lucide-react'
import { profile, projects, experiences, skillGroups } from '@/lib/data'

type Line = { kind: 'in' | 'out' | 'sys'; text: string }

const BANNER = [
  '┌──────────────────────────────────────────┐',
  '│  gautham.os — type "help" to begin       │',
  '└──────────────────────────────────────────┘',
]

const HELP = [
  'available commands',
  '  whoami            who am I',
  '  ls projects       list projects',
  '  cat resume        download my résumé',
  '  experience        career timeline',
  '  skills            languages, frameworks, ai stack',
  '  contact           how to reach me',
  '  theme <hue>       remix primary hue (0–360)',
  '  theme accent <h>  remix accent hue',
  '  theme reset       default ocean palette',
  '  snake             open the hidden arcade',
  '  sudo hire-me      ✦ prefill the contact form ✦',
  '  clear             wipe terminal',
  '  exit              close terminal',
]

export function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const print = useCallback((text: string | string[], kind: Line['kind'] = 'out') => {
    const arr = Array.isArray(text) ? text : [text]
    setLines((l) => [...l, ...arr.map((t) => ({ kind, text: t }))])
  }, [])

  const reset = useCallback(() => {
    setLines([
      ...BANNER.map<Line>((t) => ({ kind: 'sys', text: t })),
      { kind: 'sys', text: `welcome, visitor · session ${new Date().toLocaleTimeString()}` },
    ])
  }, [])

  const close = useCallback(() => setOpen(false), [])

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim()
      if (!cmd) return
      setLines((l) => [...l, { kind: 'in', text: `gautham@portfolio:~$ ${cmd}` }])
      setHistory((h) => [cmd, ...h].slice(0, 50))
      setHIdx(-1)
      const [head, ...rest] = cmd.toLowerCase().split(/\s+/)

      switch (head) {
        case 'help':
          print(HELP)
          break
        case 'whoami':
          print([
            `${profile.name} — ${profile.role}`,
            `📍 ${profile.location}`,
            '',
            profile.summary,
          ])
          break
        case 'ls':
          if (rest[0] === 'projects' || !rest[0]) {
            print(
              projects.map(
                (p, i) => `${String(i + 1).padStart(2, '0')}  ${p.title}  — ${p.tags.join(', ')}`,
              ),
            )
          } else {
            print(`ls: cannot access '${rest.join(' ')}': try 'ls projects'`)
          }
          break
        case 'experience':
          print(
            experiences.flatMap((e) => [
              `▸ ${e.role} @ ${e.company}  (${e.period})`,
              `  ${e.tags.join(' · ')}`,
              '',
            ]),
          )
          break
        case 'skills':
          print(skillGroups.flatMap((g) => [`[ ${g.title} ]`, `  ${g.skills.join(', ')}`, '']))
          break
        case 'cat':
          if (rest[0] === 'resume' || rest[0] === 'resume.pdf') {
            print('opening resume.pdf …')
            const a = document.createElement('a')
            a.href = '/resume.pdf'
            a.target = '_blank'
            a.rel = 'noopener noreferrer'
            document.body.appendChild(a)
            a.click()
            a.remove()
          } else {
            print(`cat: ${rest.join(' ') || '<file>'}: No such file. try 'cat resume'`)
          }
          break
        case 'contact':
          print([
            `email     ${profile.email}`,
            `phone     ${profile.phone}`,
            `github    ${profile.github}`,
            `linkedin  ${profile.linkedin}`,
          ])
          break
        case 'theme': {
          if (rest[0] === 'reset') {
            window.dispatchEvent(
              new CustomEvent('remix-theme', { detail: { hue: 205, accent: 50 } }),
            )
            print('theme: reset → ocean (205) / amber (50)')
          } else if (rest[0] === 'accent') {
            const h = Number(rest[1])
            if (Number.isFinite(h)) {
              window.dispatchEvent(new CustomEvent('remix-theme', { detail: { accent: h } }))
              print(`theme: accent hue → ${h}`)
            } else print('usage: theme accent <0–360>')
          } else if (rest[0] === 'dark' || rest[0] === 'light') {
            print(`theme: this site is dark-mode native — try 'theme 280' or 'theme accent 120'`)
          } else {
            const h = Number(rest[0])
            if (Number.isFinite(h)) {
              window.dispatchEvent(new CustomEvent('remix-theme', { detail: { hue: h } }))
              print(`theme: primary hue → ${h}`)
            } else print('usage: theme <0–360> | theme accent <h> | theme reset')
          }
          break
        }
        case 'snake':
        case 'arcade':
          print('launching snake.exe …')
          setTimeout(() => {
            window.dispatchEvent(new Event('open-arcade'))
            close()
          }, 350)
          break
        case 'sudo':
          if (rest.join(' ') === 'hire-me') {
            print(['[sudo] authenticating … ok', '✦ prefilling the contact form ✦'])
            setTimeout(() => {
              window.dispatchEvent(new Event('prefill-hire'))
              close()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }, 500)
          } else if (rest[0] === 'rm' && rest[1] === '-rf') {
            print(['nice try.', 'permission denied — this site is immutable ✨'])
          } else {
            print(`sudo: ${rest.join(' ')}: command not found. try 'sudo hire-me'`)
          }
          break
        case 'echo':
          print(rest.join(' '))
          break
        case 'date':
          print(new Date().toString())
          break
        case 'clear':
        case 'cls':
          reset()
          break
        case 'exit':
        case 'quit':
          print('bye 👋')
          setTimeout(close, 300)
          break
        default:
          print(`command not found: ${head}. type 'help'`)
      }
    },
    [print, reset, close],
  )

  // Global ~ toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const tgt = e.target as HTMLElement | null
        if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable))
          return
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-terminal', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-terminal', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      if (lines.length === 0) reset()
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open, lines.length, reset])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-end justify-center bg-background/80 p-4 backdrop-blur-md sm:items-center"
          onClick={close}
          role="dialog"
          aria-label="Terminal"
        >
          <motion.div
            initial={{ y: 24, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-primary/15"
          >
            {/* title bar */}
            <div className="flex items-center justify-between border-b border-glass-border bg-background/40 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-destructive/80" />
                <span className="size-3 rounded-full bg-accent/80" />
                <span className="size-3 rounded-full bg-primary/80" />
                <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  gautham@portfolio · zsh
                </span>
              </div>
              <button
                onClick={close}
                aria-label="Close terminal"
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* output */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed sm:text-[13px]"
            >
              {lines.map((l, i) => (
                <p
                  key={i}
                  className={
                    l.kind === 'in'
                      ? 'text-foreground'
                      : l.kind === 'sys'
                        ? 'text-primary/80'
                        : 'whitespace-pre-wrap text-muted-foreground'
                  }
                >
                  {l.text || '\u00A0'}
                </p>
              ))}

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  runCommand(value)
                  setValue('')
                }}
                className="mt-1 flex items-center gap-2"
              >
                <span className="shrink-0 text-primary">gautham@portfolio:~$</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      const ni = Math.min(history.length - 1, hIdx + 1)
                      if (history[ni] != null) {
                        setHIdx(ni)
                        setValue(history[ni])
                      }
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      const ni = hIdx - 1
                      setHIdx(ni)
                      setValue(ni < 0 ? '' : (history[ni] ?? ''))
                    } else if (e.key === 'Escape') {
                      close()
                    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault()
                      reset()
                    }
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 border-0 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/40"
                  placeholder="type help"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function TerminalTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-terminal'))}
      aria-label="Open terminal"
      className="glass fixed right-3 top-3 z-[80] flex size-10 items-center justify-center rounded-full ring-1 ring-primary/20 transition-transform hover:scale-105 sm:right-5 sm:top-5"
    >
      <TerminalSquare className="size-4 text-primary" />
      <span className="sr-only">Open terminal</span>
    </button>
  )
}
