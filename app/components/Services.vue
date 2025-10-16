<template>
  <section id="services" class="services">
    <h2>Our Services</h2>
    <div class="services-grid">
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :title="service.title"
        :description="service.description"
        :icon="service.icon"
        @inquire="openContactModal"
      />
    </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue'

  const services = ref([
    {
      id: 1,
      title: 'Custom Fine-Tuned Models',
      description:
        'We fine-tune AI models precisely to your data and business needs, ensuring high performance for specialized tasks like prediction or content generation.',
      icon: 'brain',
    },
    {
      id: 2,
      title: 'RAG (Retrieval-Augmented Generation)',
      description:
        'Build intelligent systems that combine your knowledge bases with AI for accurate, context-rich responses in tools like internal search or customer queries.',
      icon: 'database',
    },
    {
      id: 3,
      title: 'AI Automations',
      description:
        'Automate workflows efficiently, from data handling to process optimization, integrating seamlessly into your existing systems to save time and reduce costs.',
      icon: 'cog',
    },
    {
      id: 4,
      title: 'Private AI',
      description:
        'Deploy secure, on-premise AI solutions that prioritize data privacy and compliance, keeping your sensitive information in-house while leveraging powerful models.',
      icon: 'shield',
    },
    {
      id: 5,
      title: 'Chatbot and Conversational AI Development',
      description:
        'Create custom chatbots and conversational agents for customer support, lead generation, or internal tools, using advanced AI for natural, effective interactions.',
      icon: 'chat',
    },
    {
      id: 6,
      title: 'AI Consulting',
      description:
        'Expert advice on assessing, planning, and implementing AI in your operations, drawing from real-world experience in complex digital environments.',
      icon: 'lightbulb',
    },
  ])

  const emit = defineEmits(['inquire'])

  const openContactModal = (serviceTitle) => {
    emit('inquire', serviceTitle)
  }
</script>
