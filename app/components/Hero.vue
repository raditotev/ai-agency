<template>
  <section id="home" class="hero">
    <div class="hero-content">
      <h1>RadiPro</h1>
      <p class="tagline">Professional AI Solutions for Your Business</p>
      <p class="subheadline">
        Custom AI models, automations, and retrieval systems tailored to
        streamline operations in your business
      </p>
      <a href="#services" class="btn" @click="scrollToServices"> Learn More </a>
    </div>
  </section>
</template>

<script setup>
  const scrollToServices = (event) => {
    event.preventDefault()
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
</script>
