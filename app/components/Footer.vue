<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="wordmark">RadiPro</div>
      <div class="footer-links">
        <a href="#services">Services</a>
        <span>&copy; {{ currentYear }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const currentYear = computed(() => new Date().getFullYear())
</script>
