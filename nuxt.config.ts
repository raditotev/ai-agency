import { SERVICES } from './app/utils/services'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    preset:
      process.env.NODE_ENV === 'production' ? 'cloudflare-pages' : undefined,
    prerender: {
      routes: ['/'],
    },
  },

  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/plausible'],

  vite: {
    // Vite refuses Host headers it does not know (DNS-rebinding guard), which
    // blocks the MagicDNS name. Raw tailnet IPs are allowed without this.
    server: {
      allowedHosts: ['imac.tailfdeef3.ts.net'],
    },
  },

  plausible: {
    // Allow tracking on localhost (development)
    ignoredHostnames: [],
    domain: 'ai.radi.pro',
    apiHost: 'https://analytics.radi.pro',
  },

  site: {
    url: 'https://www.radi.pro',
  },

  runtimeConfig: {
    // Private keys (only available on server-side)
    resendApiKey: process.env.RESEND_API_KEY,
    mailerFrom: process.env.NUXT_MAILER_FROM,
    mailerTo: process.env.NUXT_MAILER_TO,
    // Modal-hosted RadiPro chat endpoint (streams plain-text tokens).
    modalChatUrl: process.env.MODAL_CHAT_URL,
  },

  app: {
    head: {
      title: 'RadiPro - Custom AI Solutions for Businesses',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Tailored AI models, automations, and retrieval systems to streamline your business. Contact RadiPro for expert AI solutions.',
        },
        {
          name: 'keywords',
          content: SERVICES.map((s) => s.title).join(', '),
        },
        {
          property: 'og:title',
          content: 'RadiPro - Custom AI Solutions for Businesses',
        },
        {
          property: 'og:description',
          content:
            'Tailored AI models, automations, and retrieval systems to streamline your business. Contact RadiPro for expert AI solutions.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.radi.pro' },
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:title',
          content: 'RadiPro - Custom AI Solutions for Businesses',
        },
        {
          name: 'twitter:description',
          content:
            'Tailored AI models, automations, and retrieval systems to streamline your business. Contact RadiPro for expert AI solutions.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Instrument+Serif&display=swap',
        },
      ],
      script: [],
    },
  },
})
