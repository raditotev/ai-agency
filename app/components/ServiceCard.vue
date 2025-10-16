<template>
  <div class="service-card" ref="cardRef">
    <div class="service-icon">
      <Icon :name="icon" />
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button
      class="btn"
      @click="handleInquire"
      :aria-label="`Inquire about ${title}`"
    >
      Inquire Now
    </button>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['inquire'])
  const cardRef = ref(null)

  const handleInquire = () => {
    emit('inquire', props.title)
  }

  // Intersection Observer for fade-in animation
  onMounted(() => {
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

    if (cardRef.value) {
      observer.observe(cardRef.value)
    }
  })
</script>
