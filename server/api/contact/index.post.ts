export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { resendApiKey, mailerFrom, mailerTo } = useRuntimeConfig()
  if (!resendApiKey || !mailerFrom || !mailerTo) {
    console.error(
      'Mailer is not configured: missing resendApiKey, mailerFrom, or mailerTo'
    )
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
    const messageText = [
      `New contact inquiry for ${body.service}`,
      '',
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      body.company ? `Company: ${body.company}` : 'No company provided',
      '',
      'Message:',
      body.message || '(no message)',
    ]
      .filter(Boolean)
      .join('\n')

    // In local/dev environments, skip actual email sending
    if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Skipping email send. Would send to:', mailerTo)
      return { success: true, message: 'Message queued (dev mode)' }
    }

    // Send email using Resend API (Cloudflare Workers compatible)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `${body.name || 'Website Contact'} <${mailerFrom}>`,
        to: mailerTo,
        replyTo: `${body.name} <${body.email}>`,
        subject: `New inquiry for ${body.service}`,
        text: messageText,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Resend API error:', errorData)
      throw new Error(`Failed to send email: ${response.statusText}`)
    }

    const result = await response.json()
    return { success: true, message: 'Message sent successfully' }
  } catch (error) {
    console.error('Error submitting form:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
