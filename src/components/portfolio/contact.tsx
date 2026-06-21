'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Briefcase, Mail, MapPin, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/portfolio/brand-icons'
import { profile } from '@/lib/data'
import { Reveal, SectionHeading } from '@/components/portfolio/section'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [prefill, setPrefill] = useState<{
    name: string
    email: string
    message: string
  } | null>(null)

  useEffect(() => {
    const onPrefill = () => {
      setPrefill({
        name: 'A future teammate',
        email: 'hello@your-company.com',
        message:
          "Hi Gautham — saw your portfolio and ran 'sudo hire-me'. Let's talk about a role.",
      })
      setTimeout(() => formRef.current?.querySelector('textarea')?.focus(), 200)
    }
    window.addEventListener('prefill-hire', onPrefill)
    return () => window.removeEventListener('prefill-hire', onPrefill)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (!WEB3FORMS_KEY) {
      // Fallback: open mail client if web3forms key isn't configured
      const subject = encodeURIComponent(
        `Portfolio inquiry from ${data.get('name')}`,
      )
      const body = encodeURIComponent(
        `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`,
      )
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      data.append('access_key', WEB3FORMS_KEY)
      data.append('subject', `Portfolio inquiry from ${data.get('name')}`)
      data.append('from_name', String(data.get('name') ?? 'Portfolio visitor'))
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-72 w-[80%] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,oklch(0.8_0.14_205/0.15),transparent_70%)] blur-3xl" />

      <SectionHeading
        index="06 / Contact"
        title="Let's build something fast."
        subtitle="Open to senior engineering roles and interesting collaborations. The quickest way to reach me is below."
      />

      <Reveal>
        <div className="glass relative mb-8 overflow-hidden rounded-2xl border border-primary/30 p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/15 blur-3xl" />
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Briefcase className="size-4" />
            </span>
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Available · Freelance
              </p>
              <h3 className="mt-1 font-heading text-lg font-semibold sm:text-xl">
                Open for freelancing.
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Contact me at{' '}
                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {profile.phone}
                </a>{' '}
                or send a message with your requirements below — I'll get back
                to you after validating.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="flex flex-col gap-3">
            {[
              { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
              {
                icon: Phone,
                label: profile.phone,
                href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`,
              },
              {
                icon: GithubIcon,
                label: 'github.com/Gautham-2002',
                href: profile.github,
              },
              {
                icon: LinkedinIcon,
                label: 'linkedin.com/in/gautham',
                href: profile.linkedin,
              },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-primary/40"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/60 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="flex-1 truncate text-sm text-foreground">
                  {label}
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
            <div className="glass flex items-center gap-4 rounded-2xl p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/60 text-primary">
                <MapPin className="size-4" />
              </span>
              <span className="text-sm text-muted-foreground">
                {profile.location}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-2xl p-6">
            {prefill && (
              <div className="mb-3 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-[11px] text-primary">
                ✦ form prefilled via <code>sudo hire-me</code>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Ada Lovelace"
                  defaultValue={prefill?.name}
                />
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@company.com"
                  defaultValue={prefill?.email}
                />
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  defaultValue={prefill?.message}
                  placeholder="Tell me about the role or project…"
                  className="resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </label>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="magnetic inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
              >
                {status === 'sending'
                  ? 'Sending…'
                  : status === 'sent'
                    ? WEB3FORMS_KEY
                      ? '✓ Message sent — talk soon!'
                      : 'Opening your mail app…'
                    : status === 'error'
                      ? 'Failed — try again'
                      : 'Send message'}
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-col items-center gap-2 border-t border-border pt-8 text-center">
        <p className="font-heading text-sm font-semibold">{profile.name}</p>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · {profile.location}
        </p>
      </footer>
    </section>
  )
}

function Field({
  name,
  label,
  type,
  placeholder,
  defaultValue,
}: {
  name: string
  label: string
  type: string
  placeholder: string
  defaultValue?: string
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  )
}
