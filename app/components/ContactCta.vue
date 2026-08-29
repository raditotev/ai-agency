<template>
  <section id="contact" class="contact-cta">
    <div class="contact-cta-inner">
      <div class="contact-cta-copy">
        <h2>Tell us what you are trying to automate.</h2>
        <p>
          A short conversation about your data, your systems and where the time
          goes. No obligation.
        </p>
      </div>
      <button class="btn" @click="$emit('inquire', '')">
        Get in touch
        <Icon name="arrow-right" :size="16" />
      </button>
    </div>
  </section>
</template>

<script setup>
  defineEmits(['inquire'])
</script>
