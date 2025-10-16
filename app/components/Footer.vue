<template>
  <footer class="footer">
    <p>&copy; {{ currentYear }} RadiPro</p>
  </footer>
</template>

<script setup>
  const currentYear = computed(() => new Date().getFullYear())
</script>
