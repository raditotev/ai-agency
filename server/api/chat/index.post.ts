interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { modalChatUrl } = useRuntimeConfig()

  if (!modalChatUrl) {
    console.error('Chat is not configured: missing MODAL_CHAT_URL')
    throw createError({
      statusCode: 500,
      statusMessage:
        'Chat service not configured. Please contact the administrator.',
    })
  }

  // Validate the conversation. The Modal endpoint expects a `messages` array of
  // user/assistant turns; the system prompt is baked into the model server-side.
  const rawMessages = Array.isArray(body?.messages) ? body.messages : null

  if (!rawMessages || rawMessages.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'At least one message is required',
    })
  }

  const messages: ChatMessage[] = rawMessages
    .filter(
      (m: unknown): m is ChatMessage =>
        !!m &&
        typeof (m as ChatMessage).role === 'string' &&
        typeof (m as ChatMessage).content === 'string'
    )
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .filter((m) => m.content.length > 0)

  if (messages.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message cannot be empty',
    })
  }

  // Call the Modal chat endpoint. It already streams plain-text tokens, so we
  // just forward the bytes straight through to the browser as they arrive.
  // The first byte may take a while: Modal cold-starts the container (and pulls
  // the model on first run) before the endpoint runs.
  let upstream: Response
  try {
    upstream = await fetch(modalChatUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })
  } catch (error: unknown) {
    console.error('Error calling Modal chat endpoint:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to get response from AI. Please try again.',
    })
  }

  if (!upstream.ok || !upstream.body) {
    const errorText = await upstream.text().catch(() => 'Unknown error')
    console.error('Modal chat endpoint error:', upstream.status, errorText)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to get response from AI. Please try again.',
    })
  }

  // Disable buffering so tokens reach the browser as soon as they stream in.
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'X-Accel-Buffering', 'no')

  return upstream.body
})
