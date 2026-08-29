<template>
  <section id="home" class="hero">
    <nav class="site-nav">
      <div class="site-nav-inner">
        <span class="wordmark">RadiPro</span>
        <div class="nav-links">
          <a href="#services" @click="scrollTo($event, 'services')">Services</a>
          <button class="btn" @click="$emit('inquire', '')">
            Get in touch
          </button>
        </div>
      </div>
    </nav>

    <div class="hero-inner">
      <div class="hero-content">
        <p class="eyebrow">AI systems, built to spec</p>

        <h1>Custom AI that fits how your business actually works.</h1>

        <p class="subheadline">
          Fine-tuned models, retrieval systems and automations, built around
          your data and deployed into the tools your team already uses.
        </p>

        <div class="hero-actions">
          <button class="btn" @click="$emit('inquire', '')">
            Start a conversation
            <Icon name="arrow-right" :size="16" />
          </button>
          <a
            href="#services"
            class="btn btn-ghost"
            @click="scrollTo($event, 'services')"
          >
            See what we build
          </a>
        </div>
      </div>

      <div class="hero-figure">
        <svg width="420" height="360" viewBox="0 0 420 360" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="418" height="358" rx="18" stroke="rgba(255,255,255,.10)" />
          <g stroke="rgba(255,255,255,.16)" stroke-width="1.25">
            <path class="flow-line" d="M104 96h96" />
            <path class="flow-line" d="M104 180h96" />
            <path class="flow-line" d="M104 264h96" />
            <path d="M200 96h28a16 16 0 0 1 16 16v52a16 16 0 0 0 16 16h12" />
            <path d="M200 180h72" />
            <path d="M200 264h28a16 16 0 0 0 16-16v-52a16 16 0 0 1 16-16h12" />
            <path class="flow-line" d="M330 180h50" />
          </g>
          <g stroke="rgba(255,255,255,.24)" stroke-width="1.25">
            <rect x="40" y="78" width="64" height="36" rx="8" />
            <rect x="40" y="162" width="64" height="36" rx="8" />
            <rect x="40" y="246" width="64" height="36" rx="8" />
          </g>
          <g fill="rgba(242,245,247,.5)" font-size="10" letter-spacing=".08em">
            <text x="56" y="101">DOCS</text>
            <text x="58" y="185">CRM</text>
            <text x="53" y="269">LOGS</text>
          </g>
          <rect x="272" y="140" width="58" height="80" rx="12" class="accent-stroke" stroke-width="1.5" fill="rgba(0,166,118,.08)" />
          <g class="accent-stroke" stroke-width="1.5" stroke-linecap="round">
            <path d="M288 168h26M288 180h26M288 192h16" />
          </g>
          <circle cx="392" cy="180" r="9" class="accent-stroke" stroke-width="1.5" />
          <circle cx="392" cy="180" r="3" class="accent-fill" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
  defineEmits(['inquire'])

  const scrollTo = (event, id) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
</script>
