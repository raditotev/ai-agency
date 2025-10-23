<template>
  <div
    v-if="isOpen"
    class="modal-overlay"
    :class="{ open: isOpen }"
    @click="closeModal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="modal" @click.stop>
      <div class="modal-header" v-if="!isSubmitted">
        <h2 id="modal-title">Get In Touch</h2>
        <button class="close-btn" @click="closeModal" aria-label="Close modal">
          ×
        </button>
      </div>

      <form @submit.prevent="submitForm" v-if="!isSubmitted">
        <div class="form-group">
          <label for="name"> Name <span class="required">*</span> </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            minlength="2"
            :class="{ error: errors.name }"
            @focus="trackFormInteraction('name', 'focus')"
          />
          <span v-if="errors.name" class="error-message">{{
            errors.name
          }}</span>
        </div>

        <div class="form-group">
          <label for="company">Company Name</label>
          <input
            id="company"
            v-model="form.company"
            type="text"
            @focus="trackFormInteraction('company', 'focus')"
          />
        </div>

        <div class="form-group">
          <label for="email"> Email <span class="required">*</span> </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :class="{ error: errors.email }"
            @focus="trackFormInteraction('email', 'focus')"
          />
          <span v-if="errors.email" class="error-message">{{
            errors.email
          }}</span>
        </div>

        <div class="form-group">
          <label for="service">
            Service Interested In <span class="required">*</span>
          </label>
          <select
            id="service"
            v-model="form.service"
            required
            :class="{ error: errors.service }"
            @change="trackFormInteraction('service', 'change')"
            @focus="trackFormInteraction('service', 'focus')"
          >
            <option value="">Select a service</option>
            <option value="Custom Fine-Tuned Models">
              Custom Fine-Tuned Models
            </option>
            <option value="RAG (Retrieval-Augmented Generation)">
              RAG (Retrieval-Augmented Generation)
            </option>
            <option value="AI Automations">AI Automations</option>
            <option value="Private AI">Private AI</option>
            <option value="Chatbot and Conversational AI Development">
              Chatbot and Conversational AI Development
            </option>
            <option value="AI Consulting">AI Consulting</option>
          </select>
          <span v-if="errors.service" class="error-message">{{
            errors.service
          }}</span>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            placeholder="Tell us about your project..."
            @focus="trackFormInteraction('message', 'focus')"
          ></textarea>
        </div>

        <!-- Honeypot field to catch bots -->
        <div class="form-group" style="display: none">
          <label for="website">Website (leave empty)</label>
          <input
            id="website"
            v-model="form.website"
            type="text"
            tabindex="-1"
            autocomplete="off"
          />
        </div>

        <button type="submit" class="btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>

      <div v-else class="success-message">
        <h3>Thank You!</h3>
        <p>
          Your message has been sent successfully. We'll get back to you soon.
        </p>
        <button class="btn" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
    preselectedService: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['close'])
  const {
    trackFormInteraction,
    trackFormSubmission,
    trackModalOpen,
    trackModalClose,
  } = useAnalytics()

  const form = reactive({
    name: '',
    company: '',
    email: '',
    service: '',
    message: '',
    website: '', // Honeypot field
  })

  const errors = reactive({})
  const isSubmitting = ref(false)
  const isSubmitted = ref(false)

  // Watch for preselected service
  watch(
    () => props.preselectedService,
    (newService) => {
      if (newService) {
        form.service = newService
      }
    },
    { immediate: true }
  )

  // Watch for modal open/close to track events
  watch(
    () => props.isOpen,
    (isOpen) => {
      if (isOpen) {
        trackModalOpen('contact_form', props.preselectedService)
      }
    }
  )

  const validateForm = () => {
    const newErrors = {}

    // Honeypot check - if filled, it's likely a bot
    if (form.website) {
      console.log('Bot detected via honeypot')
      return false
    }

    if (!form.name || form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!form.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!form.service) {
      newErrors.service = 'Please select a service'
    }

    Object.assign(errors, newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitForm = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
      // Submit to our secure API endpoint
      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: {
          name: form.name,
          company: form.company,
          email: form.email,
          service: form.service,
          message: form.message,
          website: form.website, // Include honeypot
        },
      })

      if (response.success) {
        isSubmitted.value = true
        trackFormSubmission(true, form.service)
        // Reset form
        Object.assign(form, {
          name: '',
          company: '',
          email: '',
          service: '',
          message: '',
          website: '',
        })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)

      // Try to extract specific error message from the server
      let errorMessage =
        'Sorry, there was an error sending your message. Please try again or contact us directly.'

      if (error.data?.statusMessage) {
        errorMessage = error.data.statusMessage
      } else if (error.message) {
        errorMessage = error.message
      }

      trackFormSubmission(false, form.service, errorMessage)
      alert(errorMessage)
    } finally {
      isSubmitting.value = false
    }
  }

  const closeModal = () => {
    trackModalClose('contact_form', isSubmitted.value ? 'success' : 'abandoned')
    emit('close')
    // Reset form state when closing
    setTimeout(() => {
      isSubmitted.value = false
      Object.assign(errors, {})
    }, 300)
  }

  // Focus trap for accessibility
  const trapFocus = (e) => {
    if (!props.isOpen) return

    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const firstFocusableElement =
      document.querySelectorAll(focusableElements)[0]
    const focusableContent = document.querySelectorAll(focusableElements)
    const lastFocusableElement = focusableContent[focusableContent.length - 1]

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          e.preventDefault()
        }
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', trapFocus)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', trapFocus)
  })
</script>

<style scoped>
  .error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }

  .form-group input.error,
  .form-group select.error,
  .form-group textarea.error {
    border-color: #dc2626;
  }

  .success-message {
    text-align: center;
    padding: 2rem 0;
  }

  .success-message h3 {
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .success-message p {
    margin-bottom: 2rem;
    color: var(--neutral-text);
  }
</style>
