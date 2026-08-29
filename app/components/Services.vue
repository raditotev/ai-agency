<template>
  <section id="services" class="services">
    <div class="services-inner">
      <div class="services-header">
        <div>
          <p class="eyebrow">Services</p>
          <h2>Eight ways we put AI to work.</h2>
        </div>
        <p class="services-lede">
          Every engagement starts with your data and your constraints. Pick a
          starting point, or ask us where the leverage is.
        </p>
      </div>

      <div class="service-filters" role="group" aria-label="Filter services">
        <button
          v-for="option in filters"
          :key="option"
          class="filter-chip"
          type="button"
          :aria-pressed="activeFilter === option"
          @click="activeFilter = option"
        >
          {{ option }}
        </button>
        <span class="filter-count" aria-live="polite">
          {{ visibleServices.length }} of {{ SERVICES.length }} shown
        </span>
      </div>

      <div class="services-grid">
        <ServiceCard
          v-for="service in visibleServices"
          :key="service.id"
          :title="service.title"
          :tag="service.tag"
          :description="service.description"
          :icon="service.icon"
          @inquire="openContactModal"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const filters = ['All', ...SERVICE_CATEGORIES]
  const activeFilter = ref('All')

  const visibleServices = computed(() =>
    activeFilter.value === 'All'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeFilter.value)
  )

  const emit = defineEmits(['inquire'])

  const openContactModal = (serviceTitle) => {
    emit('inquire', serviceTitle)
  }
</script>
