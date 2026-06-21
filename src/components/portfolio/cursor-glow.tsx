'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 300, damping: 40 })
  const sy = useSpring(y, { stiffness: 300, damping: 40 })
  // dot follower (faster, tighter)
  const dx = useMotionValue(-200)
  const dy = useMotionValue(-200)
  const sdx = useSpring(dx, { stiffness: 500, damping: 30 })
  const sdy = useSpring(dy, { stiffness: 500, damping: 30 })

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setEnabled(true)
    }
    function move(e: MouseEvent) {
      x.set(e.clientX - 160)
      y.set(e.clientY - 160)

      // magnetic pull on .magnetic elements
      const target = e.target as Element | null
      const mag = target?.closest('.magnetic') as HTMLElement | null
      if (mag) {
        const r = mag.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const px = (e.clientX - cx) * 0.18
        const py = (e.clientY - cy) * 0.18
        mag.style.transform = `translate3d(${px}px, ${py}px, 0)`
        mag.dataset.magnetized = '1'
        dx.set(cx - 6)
        dy.set(cy - 6)
      } else {
        // release any leftover magnetized elements
        document.querySelectorAll<HTMLElement>('[data-magnetized="1"]').forEach((el) => {
          el.style.transform = ''
          delete el.dataset.magnetized
        })
        dx.set(e.clientX - 6)
        dy.set(e.clientY - 6)
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y, dx, dy])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-30 size-80 rounded-full bg-[radial-gradient(circle,oklch(0.8_0.14_205/0.12),transparent_60%)] blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: sdx, y: sdy }}
        className="pointer-events-none fixed left-0 top-0 z-[55] size-3 rounded-full bg-primary/80 mix-blend-screen"
      />
    </>
  )
}
