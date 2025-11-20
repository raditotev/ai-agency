export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    ollamaServerUrl,
    ollamaModelName,
    cfAccessClientId,
    cfAccessClientSecret,
  } = useRuntimeConfig()

  if (!ollamaServerUrl || !ollamaModelName) {
    console.error(
      'Ollama is not configured: missing OLLAMA_SERVER_URL or OLLAMA_MODEL_NAME'
    )
    throw createError({
      statusCode: 500,
      statusMessage:
        'Chat service not configured. Please contact the administrator.',
    })
  }

  // Validate message
  if (!body.message || typeof body.message !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message is required',
    })
  }

  const userMessage = body.message.trim()

  if (!userMessage) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message cannot be empty',
    })
  }

  try {
    // Construct the Ollama API URL
    const ollamaUrl = `${ollamaServerUrl}/api/generate`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (
      process.env.NODE_ENV === 'production' &&
      cfAccessClientId &&
      cfAccessClientSecret
    ) {
      headers['CF-Access-Client-Id'] = cfAccessClientId as string
      headers['CF-Access-Client-Secret'] = cfAccessClientSecret as string
    }

    // Call Ollama API
    const response = await fetch(ollamaUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: ollamaModelName,
        prompt: userMessage,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      console.error('Ollama API error:', response.status, errorText)
      throw new Error(`Failed to get response from AI: ${response.statusText}`)
    }

    const result = await response.json()

    // Ollama returns the response in the 'response' field
    if (result.response) {
      return {
        success: true,
        response: result.response,
      }
    } else {
      createError({
        statusCode: 500,
        statusMessage: 'Invalid response format from Ollama',
      })
    }
  } catch (error: unknown) {
    console.error('Error calling Ollama:', error)

    // If it's already a createError (H3Error), re-throw it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get response from AI. Please try again.',
      })
    }
  }
})
