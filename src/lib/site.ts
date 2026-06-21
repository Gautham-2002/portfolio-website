/** Set `VITE_SITE_URL` in Vercel (e.g. https://your-app.vercel.app or your custom domain). */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://gautham-dev.lovable.app'
).replace(/\/$/, '')
