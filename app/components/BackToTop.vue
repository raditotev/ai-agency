<template>
  <button
    v-show="isVisible"
    class="back-to-top"
    :class="{ visible: isVisible }"
    @click="scrollToTop"
    aria-label="Back to top"
    ref="buttonRef"
  >
    <Icon name="chevron-up" :size="20" />
  </button>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const isVisible = ref(false)
  const buttonRef = ref(null)

  const checkScrollPosition = () => {
    const heroSection = document.getElementById('home')
    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect()
      const heroBottom = heroRect.bottom
      isVisible.value = heroBottom < 0
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', checkScrollPosition)
    // Check initial position
    checkScrollPosition()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', checkScrollPosition)
  })
</script>
