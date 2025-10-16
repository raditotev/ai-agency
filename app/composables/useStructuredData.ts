export const useStructuredData = () => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'RadiPro',
          description: 'Professional AI Solutions for Your Business',
          url: 'https://www.radi.pro',
          sameAs: [],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'contact@radi.pro',
          },
          service: [
            {
              '@type': 'Service',
              name: 'Custom Fine-Tuned Models',
              description:
                'We fine-tune AI models precisely to your data and business needs, ensuring high performance for specialized tasks like prediction or content generation.',
            },
            {
              '@type': 'Service',
              name: 'RAG (Retrieval-Augmented Generation)',
              description:
                'Build intelligent systems that combine your knowledge bases with AI for accurate, context-rich responses in tools like internal search or customer queries.',
            },
            {
              '@type': 'Service',
              name: 'AI Automations',
              description:
                'Automate workflows efficiently, from data handling to process optimization, integrating seamlessly into your existing systems to save time and reduce costs.',
            },
            {
              '@type': 'Service',
              name: 'Private AI',
              description:
                'Deploy secure, on-premise AI solutions that prioritize data privacy and compliance, keeping your sensitive information in-house while leveraging powerful models.',
            },
            {
              '@type': 'Service',
              name: 'Chatbot and Conversational AI Development',
              description:
                'Create custom chatbots and conversational agents for customer support, lead generation, or internal tools, using advanced AI for natural, effective interactions.',
            },
            {
              '@type': 'Service',
              name: 'AI Consulting',
              description:
                'Expert advice on assessing, planning, and implementing AI in your operations, drawing from real-world experience in complex digital environments.',
            },
          ],
        }),
      },
    ],
  })
}
