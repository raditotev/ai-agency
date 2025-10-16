// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Static generation
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  // SEO and performance
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],

  // Site configuration for sitemap
  site: {
    url: 'https://www.radi.pro',
  },

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (only available on server-side)
    web3formsAccessKey: process.env.WEB3FORMS_ACCESS_KEY || '',
  },

  // App configuration
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
          content:
            'custom AI models, RAG, AI automations, private AI, chatbot development, AI consulting',
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
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
        },
      ],
    },
  },
})
