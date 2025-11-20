<template>
  <div class="chatbot-container">
    <!-- Floating Chat Button -->
    <button
      v-show="!isOpen"
      class="chatbot-button"
      @click="openChat"
      aria-label="Open chatbot"
    >
      <Icon name="chat" :size="24" />
    </button>

    <!-- Chat Window -->
    <div v-show="isOpen" class="chatbot-window" :class="{ open: isOpen }">
      <div class="chatbot-header">
        <h3>AI Assistant</h3>
        <button
          class="chatbot-close-btn"
          @click="closeChat"
          aria-label="Close chatbot"
        >
          <Icon name="chevron-up" :size="20" />
        </button>
      </div>

      <div class="chatbot-messages" ref="messagesContainer">
        <!-- Welcome Message (shown on first open) -->
        <div v-if="showWelcome" class="message bot-message">
          <div class="message-content">
            <p>
              Hello! I'm an AI assistant fine-tuned specifically for RadiPro
              agency services. I'm here to help answer questions about our AI
              solutions, including custom fine-tuned models, RAG systems, AI
              automations, and more.
            </p>
            <p class="welcome-note">
              <strong>Note:</strong> This is a demonstration chatbot. RadiPro is
              a small company with a limited number of services. This chatbot is
              a real world version of what a custom fine-tuned model might look
              like on your company's website.
            </p>
          </div>
        </div>

        <!-- Chat Messages -->
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="message.role === 'user' ? 'user-message' : 'bot-message'"
        >
          <div class="message-content">
            <p v-html="formatMessage(message.content)"></p>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="message bot-message">
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="sendMessage" class="chatbot-input-form">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Type your message..."
          class="chatbot-input"
          :disabled="isLoading"
          ref="inputRef"
        />
        <button
          type="submit"
          class="chatbot-send-btn"
          :disabled="!inputMessage.trim() || isLoading"
          aria-label="Send message"
        >
          <Icon name="chevron-up" :size="20" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, nextTick, watch, onMounted } from 'vue'

  const isOpen = ref(false)
  const showWelcome = ref(false)
  const messages = ref([])
  const inputMessage = ref('')
  const isLoading = ref(false)
  const messagesContainer = ref(null)
  const inputRef = ref(null)

  const WELCOME_STORAGE_KEY = 'chatbot_welcome_shown'

  const openChat = () => {
    isOpen.value = true
    const hasSeenWelcome = localStorage.getItem(WELCOME_STORAGE_KEY)
    if (!hasSeenWelcome) {
      showWelcome.value = true
      localStorage.setItem(WELCOME_STORAGE_KEY, 'true')
    }
    nextTick(() => {
      scrollToBottom()
      inputRef.value?.focus()
    })
  }

  const closeChat = () => {
    isOpen.value = false
  }

  const scrollToBottom = () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }

  const formatMessage = (text) => {
    // Simple formatting: convert newlines to <br> and escape HTML
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
  }

  const sendMessage = async () => {
    if (!inputMessage.value.trim() || isLoading.value) return

    const userMessage = inputMessage.value.trim()
    inputMessage.value = ''

    // Add user message
    messages.value.push({
      role: 'user',
      content: userMessage,
    })

    scrollToBottom()
    isLoading.value = true

    try {
      const response = await $fetch('/api/chat', {
        method: 'POST',
        body: {
          message: userMessage,
        },
      })

      if (response.success && response.response) {
        messages.value.push({
          role: 'assistant',
          content: response.response,
        })
      } else {
        throw new Error(response.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      messages.value.push({
        role: 'assistant',
        content:
          'Sorry, I encountered an error. Please try again or use the contact form for assistance.',
      })
    } finally {
      isLoading.value = false
      scrollToBottom()
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
  }

  // Watch for new messages and scroll
  watch(
    () => messages.value.length,
    () => {
      scrollToBottom()
    }
  )
</script>

<style scoped>
  .chatbot-container {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 200;
  }

  .chatbot-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 166, 118, 0.3);
    transition: transform 0.2s ease;
    z-index: 200;
  }

  .chatbot-button:hover {
    transform: scale(1.05);
  }

  .chatbot-button:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .chatbot-window {
    position: fixed;
    bottom: 0;
    right: 2rem;
    width: 100%;
    max-width: 400px;
    max-height: 500px;
    background: var(--neutral-bg);
    border: 1px solid var(--border);
    border-radius: 0.5rem 0.5rem 0 0;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 200;
  }

  .chatbot-window.open {
    transform: translateY(0);
  }

  .chatbot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--primary);
    color: white;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .chatbot-header h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .chatbot-close-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    transform: rotate(180deg);
  }

  .chatbot-close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 200px;
    max-height: 400px;
  }

  .message {
    display: flex;
    flex-direction: column;
    max-width: 85%;
    animation: fadeInUp 0.3s ease-out;
  }

  .user-message {
    align-self: flex-end;
  }

  .bot-message {
    align-self: flex-start;
  }

  .message-content {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    line-height: 1.5;
  }

  .user-message .message-content {
    background: var(--accent);
    color: white;
  }

  .bot-message .message-content {
    background: var(--border);
    color: var(--neutral-text);
  }

  .welcome-note {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .typing-indicator {
    display: flex;
    gap: 0.25rem;
    padding: 0.5rem 0;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--neutral-text);
    opacity: 0.6;
    animation: typing 1.4s infinite;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }

  .chatbot-input-form {
    display: flex;
    padding: 1rem;
    border-top: 1px solid var(--border);
    gap: 0.5rem;
  }

  .chatbot-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.25rem;
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .chatbot-input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(0, 166, 118, 0.1);
  }

  .chatbot-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .chatbot-send-btn {
    width: 40px;
    height: 40px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, transform 0.2s ease;
    transform: rotate(-90deg);
  }

  .chatbot-send-btn:hover:not(:disabled) {
    background: #008a5e;
    transform: rotate(-90deg) scale(1.05);
  }

  .chatbot-send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.6;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }

  /* Responsive design */
  @media (max-width: 639px) {
    .chatbot-window {
      right: 0;
      left: 0;
      max-width: 100%;
      border-radius: 0;
    }

    .chatbot-button {
      bottom: 1rem;
      right: 1rem;
      width: 48px;
      height: 48px;
    }

    .chatbot-messages {
      max-height: 300px;
    }
  }
</style>
