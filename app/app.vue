<template>
  <div>
    <NuxtRouteAnnouncer />

    <main>
      <Hero />
      <Services @inquire="openContactModal" />
    </main>

    <Footer />
    <BackToTop />
    <Chatbot />

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
  const { trackScrollDepth } = useAnalytics()

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

  // Scroll depth tracking
  const trackedScrollDepths = ref(new Set())

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

    // Track at 25%, 50%, 75%, and 100% milestones
    const milestones = [25, 50, 75, 100]
    milestones.forEach((milestone) => {
      if (
        scrollPercentage >= milestone &&
        !trackedScrollDepths.value.has(milestone)
      ) {
        trackedScrollDepths.value.add(milestone)
        trackScrollDepth(milestone)
      }
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>
