<template>
  <span
    :class="['material-icons', className]"
    :style="{ fontSize: size + 'px', color: color }"
    :aria-hidden="ariaHidden"
  >
    {{ materialIconName }}
  </span>
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

  // Mapping from custom icon names to Material Icons names
  const iconMap = {
    brain: 'psychology',
    database: 'storage',
    cog: 'settings',
    shield: 'security',
    chat: 'chat',
    lightbulb: 'lightbulb',
    'chevron-up': 'keyboard_arrow_up',
  }

  const materialIconName = computed(() => {
    return iconMap[props.name] || props.name
  })
</script>
