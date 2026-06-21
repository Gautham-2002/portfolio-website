import { createFileRoute } from '@tanstack/react-router'
import { SmoothScroll } from '@/components/portfolio/smooth-scroll'
import { CursorGlow } from '@/components/portfolio/cursor-glow'
import { Navigation } from '@/components/portfolio/navigation'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { TechStack } from '@/components/portfolio/tech-stack'
import { ExperienceSection } from '@/components/portfolio/experience'
import { Projects } from '@/components/portfolio/projects'
import { CssPlayground } from '@/components/portfolio/css-playground'
import { Contact } from '@/components/portfolio/contact'
import { KonamiGame } from '@/components/portfolio/konami-game'
import { ArcadeChip } from '@/components/portfolio/arcade-chip'
import { BootSequence } from '@/components/portfolio/boot-sequence'
import { Terminal, TerminalTrigger } from '@/components/portfolio/terminal'
import { ThemeRemixer } from '@/components/portfolio/theme-remixer'
import { SITE_URL } from '@/lib/site'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Gautham Gokulakonda — Software Engineer' },
      {
        name: 'description',
        content:
          'Senior Software Engineer specializing in Go concurrency, Python/AI systems, and high-performance React frontends.',
      },
      { property: 'og:title', content: 'Gautham Gokulakonda — Software Engineer' },
      {
        property: 'og:description',
        content:
          'Senior Software Engineer specializing in Go, Python/AI, and high-performance React frontends.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${SITE_URL}/` },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/` }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Gautham Gokulakonda',
          jobTitle: 'Senior Software Engineer',
          url: `${SITE_URL}/`,
          email: 'mailto:gokulakondagautham2002@gmail.com',
          telephone: '+91-8688939536',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressCountry: 'IN',
          },
          sameAs: [
            'https://github.com/Gautham-2002',
            'https://www.linkedin.com/in/gautham-gokulakonda-a92196231',
          ],
          knowsAbout: [
            'Go',
            'Python',
            'TypeScript',
            'React',
            'LLM systems',
            'RAG',
            'Microservices',
            'Kubernetes',
          ],
        }),
      },
    ],
  }),
  component: Index,
})

function Index() {
  return (
    <SmoothScroll>
      <BootSequence />
      <CursorGlow />
      <Navigation />
      <TerminalTrigger />
      <KonamiGame />
      <Terminal />
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <ExperienceSection />
        <Projects />
        <CssPlayground />
        <Contact />
      </main>
      <ArcadeChip />
      <ThemeRemixer />
    </SmoothScroll>
  )
}
