<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="className"
    :aria-hidden="ariaHidden"
    focusable="false"
  >
    <path v-for="(d, i) in paths" :key="i" :d="d" />
  </svg>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    color: {
      type: String,
      default: 'currentColor',
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

  // Stroke icons on a 24px grid, one path per stroke group.
  const icons = {
    // Sliders: fine-tuning a model to your data
    tune: [
      'M3 7h7M14 7h7M3 12h11M18 12h3M3 17h4M11 17h10',
      'M10 7a2 2 0 1 0 4 0a2 2 0 1 0-4 0M14 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    ],
    // Stacked layers: a knowledge base being retrieved from
    layers: [
      'M12 3 3 7.5l9 4.5 9-4.5-9-4.5Z',
      'M3 12l9 4.5 9-4.5',
      'M3 16.5 12 21l9-4.5',
    ],
    // Closed loop: a workflow that runs itself
    loop: [
      'M4 12a8 8 0 0 1 13.7-5.6',
      'M20 12a8 8 0 0 1-13.7 5.6',
      'M18 3v4h-4M6 21v-4h4',
    ],
    // Shield with a keyhole: data that stays in-house
    shield: [
      'M12 3 4.5 6v6c0 4.5 3.2 7.5 7.5 9 4.3-1.5 7.5-4.5 7.5-9V6L12 3Z',
      'M12 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3',
      'M12 13.6v2.4',
    ],
    // Speech bubble
    chat: [
      'M20 14.5A1.5 1.5 0 0 1 18.5 16H9l-5 4V5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5Z',
      'M8.5 10h.01M12 10h.01M15.5 10h.01',
    ],
    // Compass: advice on which way to go
    compass: [
      'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0',
      'M14.6 9.4 13 13l-3.6 1.6L11 11l3.6-1.6Z',
    ],
    // Hub with ports: an MCP server fronting your existing systems
    hub: [
      'M9.5 10.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1Z',
      'M12 9.5V6M14.5 12H18M12 14.5V18M9.5 12H6',
      'M10.5 4.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M18 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M10.5 19.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M3 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0',
    ],
    // Task list, two done and one running: digital workers
    tasks: [
      'M10 6.6h10M10 11.6h10M10 16.6h7',
      'M3.5 6.6 5 8.1 7.6 5.2M3.5 11.6 5 13.1 7.6 10.2',
      'M3.5 16.6a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0',
    ],
    'chevron-up': ['M6 14.5 12 8.5l6 6'],
    'arrow-right': ['M5 12h13M13 6l6 6-6 6'],
    close: ['M6 6l12 12M18 6L6 18'],
  }

  const paths = computed(() => icons[props.name] || [])
</script>
