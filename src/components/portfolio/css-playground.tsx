'use client'

import { Reveal, SectionHeading } from '@/components/portfolio/section'

const demos = [
  {
    title: '3D Transforms',
    note: 'transform-style: preserve-3d',
    render: () => (
      <div className="cube-stage">
        <div className="cube">
          <span className="face front">GO</span>
          <span className="face back">PY</span>
          <span className="face right">TS</span>
          <span className="face left">JS</span>
          <span className="face top">AI</span>
          <span className="face bottom">{'{}'}</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Conic Border',
    note: 'conic-gradient + mask',
    render: () => (
      <div className="conic-card">
        <div className="conic-inner">
          <span className="font-mono text-sm text-muted-foreground">hover me</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Clip-path Morph',
    note: 'clip-path + transition',
    render: () => <div className="morph" aria-hidden="true" />,
  },
  {
    title: 'Gradient Shimmer',
    note: 'background-clip: text',
    render: () => <div className="shimmer font-heading text-4xl font-bold">CSS</div>,
  },
  {
    title: 'Magnetic Glow',
    note: 'radial-gradient mask',
    render: () => (
      <div className="glow-grid" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="dot" />
        ))}
      </div>
    ),
  },
  {
    title: 'Liquid Toggle',
    note: 'pure-CSS :checked',
    render: () => (
      <label className="liquid-toggle">
        <input type="checkbox" defaultChecked aria-label="demo toggle" />
        <span className="track">
          <span className="thumb" />
        </span>
      </label>
    ),
  },
]

export function CssPlayground() {
  return (
    <section id="playground" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="05 / Lab · Experiments"
        title="Things I tinker with after hours."
        subtitle="Playable, hand-written CSS experiments — hover, click, toggle. No libraries, no frameworks. Just modern CSS pushed a bit further than it usually gets."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, i) => (
          <Reveal key={demo.title} delay={i * 0.05}>
            <div className="css-card glass flex h-56 flex-col rounded-2xl p-5">
              <div className="flex flex-1 items-center justify-center">
                {demo.render()}
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-heading text-sm font-semibold">
                  {demo.title}
                </span>
                <span className="font-mono text-[10px] text-primary">
                  {demo.note}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{css}</style>
    </section>
  )
}

const css = `
/* --- 3D rotating cube --- */
.cube-stage { perspective: 600px; width: 90px; height: 90px; }
.cube {
  position: relative; width: 90px; height: 90px;
  transform-style: preserve-3d;
  animation: cube-spin 12s linear infinite;
}
.css-card:hover .cube { animation-duration: 4s; }
.face {
  position: absolute; inset: 0; display: grid; place-items: center;
  font-family: var(--font-mono); font-size: 18px; font-weight: 700;
  color: oklch(0.95 0.01 250);
  border: 1px solid oklch(0.8 0.14 205 / 0.5);
  background: oklch(0.8 0.14 205 / 0.08);
}
.front  { transform: translateZ(45px); }
.back   { transform: rotateY(180deg) translateZ(45px); }
.right  { transform: rotateY(90deg) translateZ(45px); }
.left   { transform: rotateY(-90deg) translateZ(45px); }
.top    { transform: rotateX(90deg) translateZ(45px); }
.bottom { transform: rotateX(-90deg) translateZ(45px); }
@keyframes cube-spin {
  from { transform: rotateX(-20deg) rotateY(0deg); }
  to   { transform: rotateX(-20deg) rotateY(360deg); }
}

/* --- conic gradient animated border --- */
.conic-card {
  position: relative; width: 130px; height: 90px; border-radius: 16px;
  display: grid; place-items: center; overflow: hidden;
}
.conic-card::before {
  content: ''; position: absolute; inset: -60%;
  background: conic-gradient(from 0deg, transparent 0 55%, oklch(0.8 0.14 205), oklch(0.72 0.15 50), transparent 75%);
  animation: conic-spin 4s linear infinite;
}
.conic-inner {
  position: absolute; inset: 2px; border-radius: 14px;
  display: grid; place-items: center;
  background: oklch(0.2 0.02 256);
  transition: inset 0.3s ease;
}
.conic-card:hover .conic-inner { inset: 4px; }
@keyframes conic-spin { to { transform: rotate(360deg); } }

/* --- clip-path morph --- */
.morph {
  width: 90px; height: 90px;
  background: linear-gradient(135deg, oklch(0.8 0.14 205), oklch(0.72 0.15 50));
  clip-path: polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%);
  transition: clip-path 0.5s cubic-bezier(0.16,1,0.3,1), border-radius 0.5s ease, transform 0.5s ease;
}
.css-card:hover .morph {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  border-radius: 24px;
  transform: rotate(45deg) scale(0.9);
}

/* --- gradient shimmer text --- */
.shimmer {
  background: linear-gradient(110deg, oklch(0.4 0.02 256) 35%, oklch(0.8 0.14 205) 50%, oklch(0.4 0.02 256) 65%);
  background-size: 220% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: shimmer 2.4s linear infinite;
  letter-spacing: 0.05em;
}
@keyframes shimmer { to { background-position: -220% 0; } }

/* --- magnetic glow grid --- */
.glow-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
}
.glow-grid .dot {
  width: 12px; height: 12px; border-radius: 4px;
  background: oklch(0.8 0.14 205 / 0.25);
  transition: transform 0.3s ease, background 0.3s ease;
}
.css-card:hover .glow-grid .dot {
  background: oklch(0.8 0.14 205 / 0.9);
  box-shadow: 0 0 12px oklch(0.8 0.14 205 / 0.7);
}
.css-card:hover .glow-grid .dot:nth-child(odd) { transform: scale(1.25); }

/* --- liquid toggle --- */
.liquid-toggle input { position: absolute; opacity: 0; pointer-events: none; }
.liquid-toggle .track {
  display: block; width: 92px; height: 44px; border-radius: 999px;
  background: oklch(0.26 0.02 256); position: relative; cursor: pointer;
  transition: background 0.4s ease; border: 1px solid var(--glass-border);
}
.liquid-toggle .thumb {
  position: absolute; top: 4px; left: 4px; width: 34px; height: 34px;
  border-radius: 999px; background: oklch(0.95 0.01 250);
  transition: left 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s ease;
}
.liquid-toggle input:checked + .track {
  background: linear-gradient(120deg, oklch(0.8 0.14 205), oklch(0.72 0.15 50));
}
.liquid-toggle input:checked + .track .thumb { left: 54px; }
.liquid-toggle .track:active .thumb { transform: scaleX(1.3); }
`
