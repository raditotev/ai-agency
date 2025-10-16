<template>
  <footer class="footer">
    <p>&copy; {{ currentYear }} RadiPro</p>
  </footer>
</template>

<script setup>
  import { computed } from 'vue'

  const currentYear = computed(() => {
    return new Date().getFullYear()
  })
</script>
