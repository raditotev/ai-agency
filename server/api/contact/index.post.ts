export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Honeypot check - if filled, it's likely a bot
  if (body.website) {
    console.log('Bot detected via honeypot on server')
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request',
    })
  }

  // Validate required fields
  if (!body.name || !body.email || !body.service) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format',
    })
  }

  try {
    const response = await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        access_key: config.web3formsAccessKey,
        name: body.name,
        company: body.company || '',
        email: body.email,
        service: body.service,
        message: body.message || '',
        subject: `New inquiry for ${body.service}`,
        from_name: body.name,
        reply_to: body.email,
      },
    })

    if (response.success) {
      return { success: true, message: 'Message sent successfully' }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send message',
      })
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
