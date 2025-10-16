export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Check if web3forms access key is configured
  if (
    !config.web3formsAccessKey ||
    config.web3formsAccessKey === 'your_access_key_here'
  ) {
    console.error('WEB3FORMS_ACCESS_KEY is not configured')
    throw createError({
      statusCode: 500,
      statusMessage:
        'Email service not configured. Please contact the administrator.',
    })
  }

  // Honeypot check - if filled, it's likely a bot
  if (body.website) {
    console.log('Bot detected via honeypot on server')
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request',
    })
  }

  // Validate required fields
  const missingFields = []
  if (!body.name) missingFields.push('name')
  if (!body.email) missingFields.push('email')
  if (!body.service) missingFields.push('service')

  if (missingFields.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields: ${missingFields.join(', ')}`,
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Invalid email format. Please enter a valid email address.',
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

    if ((response as any).success) {
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
