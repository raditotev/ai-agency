export const useStructuredData = () => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'RadiPro',
          description:
            'Fine-tuned models, retrieval systems and automations, built around your data and deployed into the tools your team already uses.',
          url: 'https://www.radi.pro',
          sameAs: [],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'contact@radi.pro',
          },
          service: SERVICES.map((s) => ({
            '@type': 'Service',
            name: s.title,
            description: s.description,
          })),
        }),
      },
    ],
  })
}
