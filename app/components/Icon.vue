<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :class="className"
    :aria-hidden="ariaHidden"
  >
    <path
      v-if="name === 'brain'"
      d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1 .34-4.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
    />
    <path
      v-else-if="name === 'database'"
      d="M4 7c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3Z M4 7c0 1.657 3.582 3 8 3s8-1.343 8-3 M4 7v6c0 1.657 3.582 3 8 3s8-1.343 8-3V7 M4 13c0 1.657 3.582 3 8 3s8-1.343 8-3 M4 13v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6"
    />
    <path
      v-else-if="name === 'cog'"
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"
    />
    <path
      v-else-if="name === 'shield'"
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4"
    />
    <path
      v-else-if="name === 'chat'"
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 9h8 M8 13h6"
    />
    <path
      v-else-if="name === 'lightbulb'"
      d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z M12 2C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"
    />
    <path v-else-if="name === 'chevron-up'" d="m18 15-6-6-6 6" />
  </svg>
</template>

<script setup>
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },
    fill: {
      type: String,
      default: 'none',
    },
    stroke: {
      type: String,
      default: 'currentColor',
    },
    strokeWidth: {
      type: [String, Number],
      default: 2,
    },
    className: {
      type: String,
      default: '',
    },
    ariaHidden: {
      type: Boolean,
      default: true,
    },
  })
</script>
