<template>
  <article class="service-card" ref="cardRef">
    <span class="service-icon"><Icon :name="icon" :size="30" /></span>

    <span class="service-tag">{{ tag }}</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>

    <button
      class="service-inquire"
      @click="handleInquire"
      :aria-label="`Inquire about ${title}`"
    >
      Inquire
      <Icon name="arrow-right" :size="15" />
    </button>
  </article>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const props = defineProps({
    title: { type: String, required: true },
    tag: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  })

  const emit = defineEmits(['inquire'])
  const cardRef = ref(null)
  const { trackServiceInquiry } = useAnalytics()

  const handleInquire = () => {
    trackServiceInquiry(props.title)
    emit('inquire', props.title)
  }

  // Fade cards in as they enter the viewport
  onMounted(() => {
    if (!cardRef.value) return

    // Cards are visible by default; the observer only plays the entrance.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(cardRef.value)
  })
</script>
