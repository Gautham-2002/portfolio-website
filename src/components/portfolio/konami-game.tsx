'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
  Trophy,
  X,
} from 'lucide-react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

const GRID = 17
const TICK_MS = 115

type Point = { x: number; y: number }
type Dir = 'up' | 'down' | 'left' | 'right'

const DIRS: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}
const OPPOSITE: Record<Dir, Dir> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

function randFood(snake: Point[]): Point {
  while (true) {
    const f = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    }
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f
  }
}

export function KonamiGame() {
  const [open, setOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [running, setRunning] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snakeRef = useRef<Point[]>([{ x: 8, y: 8 }])
  const dirRef = useRef<Dir>('right')
  const queuedRef = useRef<Dir | null>(null)
  const foodRef = useRef<Point>({ x: 12, y: 8 })
  const runningRef = useRef(true)
  const overRef = useRef(false)

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 8, y: 8 }]
    dirRef.current = 'right'
    queuedRef.current = null
    foodRef.current = randFood(snakeRef.current)
    overRef.current = false
    runningRef.current = true
    setScore(0)
    setGameOver(false)
    setRunning(true)
  }, [])

  const openGame = useCallback(() => {
    resetGame()
    setOpen(true)
  }, [resetGame])

  // Konami sequence listener (always active while mounted)
  useEffect(() => {
    let idx = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === KONAMI[idx]) {
        idx += 1
        if (idx === KONAMI.length) {
          idx = 0
          openGame()
        }
      } else {
        // allow restart of the sequence if the key matches the first step
        idx = key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    const onOpenEvent = () => openGame()
    window.addEventListener('open-arcade', onOpenEvent as EventListener)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-arcade', onOpenEvent as EventListener)
    }
  }, [openGame])

  const setDirection = useCallback((d: Dir) => {
    if (overRef.current) return
    const current = queuedRef.current ?? dirRef.current
    if (d === OPPOSITE[current] || d === current) return
    queuedRef.current = d
  }, [])

  // Lock scroll + in-game controls while open
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          e.preventDefault()
          setDirection('up')
          break
        case 'ArrowDown':
        case 's':
          e.preventDefault()
          setDirection('down')
          break
        case 'ArrowLeft':
        case 'a':
          e.preventDefault()
          setDirection('left')
          break
        case 'ArrowRight':
        case 'd':
          e.preventDefault()
          setDirection('right')
          break
        case ' ':
          e.preventDefault()
          if (!overRef.current) {
            runningRef.current = !runningRef.current
            setRunning(runningRef.current)
          }
          break
        case 'Escape':
          setOpen(false)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, setDirection])

  // Game loop
  useEffect(() => {
    if (!open) return
    const id = window.setInterval(() => {
      if (!runningRef.current || overRef.current) return

      if (queuedRef.current) {
        dirRef.current = queuedRef.current
        queuedRef.current = null
      }

      const snake = snakeRef.current
      const delta = DIRS[dirRef.current]
      const head = { x: snake[0].x + delta.x, y: snake[0].y + delta.y }

      const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
      const hitSelf = snake.some((s) => s.x === head.x && s.y === head.y)
      if (hitWall || hitSelf) {
        overRef.current = true
        runningRef.current = false
        setGameOver(true)
        setRunning(false)
        setBest((b) => Math.max(b, snake.length - 1))
        return
      }

      const newSnake = [head, ...snake]
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        foodRef.current = randFood(newSnake)
        setScore(newSnake.length - 1)
      } else {
        newSnake.pop()
      }
      snakeRef.current = newSnake
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [open])

  // Render loop
  useEffect(() => {
    if (!open) return
    let raf = 0
    const draw = () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (canvas && ctx) {
        const size = canvas.width
        const cell = size / GRID
        ctx.clearRect(0, 0, size, size)

        // subtle grid
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'
        ctx.lineWidth = 1
        for (let i = 1; i < GRID; i++) {
          ctx.beginPath()
          ctx.moveTo(i * cell, 0)
          ctx.lineTo(i * cell, size)
          ctx.moveTo(0, i * cell)
          ctx.lineTo(size, i * cell)
          ctx.stroke()
        }

        // food
        const f = foodRef.current
        ctx.fillStyle = 'rgb(240, 170, 90)'
        ctx.shadowColor = 'rgba(240,170,90,0.8)'
        ctx.shadowBlur = 14
        ctx.beginPath()
        ctx.arc(f.x * cell + cell / 2, f.y * cell + cell / 2, cell * 0.32, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // snake
        const snake = snakeRef.current
        snake.forEach((s, i) => {
          const t = i / Math.max(snake.length, 1)
          const light = 235 - t * 70
          ctx.fillStyle = i === 0 ? 'rgb(190, 248, 255)' : `rgb(90, ${light}, ${light + 10})`
          if (i === 0) {
            ctx.shadowColor = 'rgba(120,220,235,0.9)'
            ctx.shadowBlur = 16
          } else {
            ctx.shadowBlur = 0
          }
          const pad = cell * 0.12
          const r = cell * 0.22
          const x = s.x * cell + pad
          const y = s.y * cell + pad
          const w = cell - pad * 2
          ctx.beginPath()
          ctx.roundRect(x, y, w, w, r)
          ctx.fill()
        })
        ctx.shadowBlur = 0
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Hidden Snake arcade game"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-md rounded-3xl p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  Easter Egg Unlocked
                </p>
                <h3 className="font-heading text-xl font-bold">Snake.exe</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close game"
                className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between font-mono text-sm">
              <span className="text-muted-foreground">
                Score <span className="ml-1 text-base font-semibold text-foreground">{score}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Trophy className="size-3.5 text-accent" />
                Best <span className="font-semibold text-foreground">{best}</span>
              </span>
            </div>

            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-glass-border bg-background/40">
              <canvas ref={canvasRef} width={510} height={510} className="h-full w-full" />

              {/* overlays */}
              {(gameOver || !running) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm">
                  <p className="font-heading text-2xl font-bold">
                    {gameOver ? 'Game Over' : 'Paused'}
                  </p>
                  {gameOver && (
                    <p className="font-mono text-sm text-muted-foreground">You scored {score}</p>
                  )}
                  <button
                    onClick={() => {
                      if (gameOver) resetGame()
                      else {
                        runningRef.current = true
                        setRunning(true)
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                  >
                    {gameOver ? (
                      <>
                        <RotateCcw className="size-4" /> Play again
                      </>
                    ) : (
                      <>
                        <Play className="size-4" /> Resume
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* mobile D-pad + controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="grid grid-cols-3 gap-1.5 sm:hidden">
                <span />
                <DpadButton onClick={() => setDirection('up')} label="Up">
                  <ArrowUp className="size-4" />
                </DpadButton>
                <span />
                <DpadButton onClick={() => setDirection('left')} label="Left">
                  <ArrowLeft className="size-4" />
                </DpadButton>
                <DpadButton onClick={() => setDirection('down')} label="Down">
                  <ArrowDown className="size-4" />
                </DpadButton>
                <DpadButton onClick={() => setDirection('right')} label="Right">
                  <ArrowRight className="size-4" />
                </DpadButton>
              </div>

              <p className="hidden font-mono text-[11px] leading-relaxed text-muted-foreground sm:block">
                Arrows / WASD to move
                <br />
                Space to pause · Esc to close
              </p>

              <button
                onClick={() => {
                  if (overRef.current) return
                  runningRef.current = !runningRef.current
                  setRunning(runningRef.current)
                }}
                aria-label={running ? 'Pause' : 'Resume'}
                className="flex size-11 items-center justify-center rounded-full border border-glass-border bg-secondary/50 text-foreground transition-colors hover:border-primary/40"
              >
                {running ? <Pause className="size-5" /> : <Play className="size-5" />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DpadButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-xl border border-glass-border bg-secondary/50 text-foreground transition-colors active:bg-primary active:text-primary-foreground"
    >
      {children}
    </button>
  )
}
