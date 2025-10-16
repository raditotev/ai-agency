<template>
  <div>
    <NuxtRouteAnnouncer />

    <main>
      <Hero />
      <Services @inquire="openContactModal" />
    </main>

    <Footer />
    <BackToTop />

    <ContactModal
      :is-open="isModalOpen"
      :preselected-service="selectedService"
      @close="closeContactModal"
    />
  </div>
</template>

<script setup>
  import '../assets/css/main.css'

  // Modal state
  const isModalOpen = ref(false)
  const selectedService = ref('')

  const openContactModal = (serviceTitle) => {
    selectedService.value = serviceTitle
    isModalOpen.value = true
  }

  const closeContactModal = () => {
    isModalOpen.value = false
    selectedService.value = ''
  }

  // SEO structured data
  useStructuredData()
</script>
