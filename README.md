# RadiPro Agency Website

A modern, single-page website for RadiPro AI agency built with Nuxt.js v4.x and static generation for optimal performance.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints at 640px, 768px, and 1024px
- **Hero Section**: Full-viewport gradient background with smooth animations
- **Services Section**: 6 AI services with interactive cards and hover effects
- **Contact Modal**: Form with validation and Resend email integration
- **Back-to-Top Button**: Appears on scroll with smooth animation
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Static generation, optimized assets, and minimal JavaScript

## Technology Stack

- **Framework**: Nuxt.js v4.x with static generation
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Custom SVG icons (Heroicons style)
- **Forms**: Resend API for secure email delivery (Cloudflare Workers compatible)
- **Fonts**: Google Fonts (Inter)
- **Deployment**: Static site ready for Vercel/Netlify

## Services Offered

1. **Custom Fine-Tuned Models** - AI models tailored to your data and business needs
2. **RAG (Retrieval-Augmented Generation)** - Intelligent systems combining knowledge bases with AI
3. **AI Automations** - Workflow automation and process optimization
4. **Private AI** - Secure, on-premise AI solutions for data privacy
5. **Chatbot and Conversational AI Development** - Custom chatbots and conversational agents
6. **AI Consulting** - Expert advice on AI implementation and strategy

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd agency-website/v2
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp env.example .env
```

4. Edit `.env` and add your Resend credentials:

```
RESEND_API_KEY=re_your_api_key_here
NUXT_MAILER_FROM=noreply@radi.pro
NUXT_MAILER_TO=recipient@example.com
```

**Security Note**: Resend API key is stored server-side only and never exposed to the client. Get your API key at [Resend API Keys](https://resend.com/api-keys). The `NUXT_MAILER_FROM` email must be verified in your Resend account.

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the website.

### Building for Production

Generate static files:

```bash
npm run generate
```

The static files will be generated in the `.output/public` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

### Manual Deployment

1. Run `npm run generate`
2. Upload the contents of `.output/public` to your static hosting provider
3. Configure your domain to point to the hosting provider

## Configuration

### Resend Email Setup

1. Create a Resend account:

   - Visit [Resend](https://resend.com) and sign up for a free account
   - The free tier includes 3,000 emails per month

2. Get your API key:

   - Go to [Resend API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Give it a name (e.g., "RadiPro Website")
   - Copy the API key (starts with `re_`)

3. Verify your domain (or use the test domain):

   - Go to [Resend Domains](https://resend.com/domains)
   - Add and verify your domain (for production)
   - Or use the provided test domain for development/testing

4. Add credentials to your `.env` file:

   - `RESEND_API_KEY`: Your Resend API key (starts with `re_`)
   - `NUXT_MAILER_FROM`: The verified sender email address (e.g., `noreply@yourdomain.com`)
   - `NUXT_MAILER_TO`: The email address where contact form submissions should be sent

5. The form will automatically send emails via Resend API when submitted

**Note**: Resend is compatible with Cloudflare Workers and Pages, making it ideal for serverless deployments.

### Customization

- **Colors**: Edit CSS variables in `assets/css/main.css`
- **Content**: Update service descriptions in `components/Services.vue`
- **SEO**: Modify meta tags in `nuxt.config.ts`
- **Styling**: Customize styles in `assets/css/main.css`

## Project Structure

```
├── app/
│   └── app.vue              # Main app component
├── assets/
│   └── css/
│       └── main.css         # Global styles
├── components/
│   ├── BackToTop.vue        # Back to top button
│   ├── ContactModal.vue     # Contact form modal
│   ├── Footer.vue           # Footer component
│   ├── Hero.vue             # Hero section
│   ├── Icon.vue             # SVG icon component
│   ├── ServiceCard.vue      # Individual service card
│   └── Services.vue         # Services section
├── public/
│   ├── favicon.ico          # Site favicon
│   └── robots.txt           # Robots.txt
├── nuxt.config.ts           # Nuxt configuration
├── package.json             # Dependencies
└── README.md               # This file
```

## Performance Features

- **Static Generation**: Pre-rendered HTML for fast loading
- **Optimized Assets**: Minified CSS and JavaScript
- **Lazy Loading**: Icons and images load on demand
- **Smooth Animations**: CSS-based animations for better performance
- **Responsive Images**: Optimized for different screen sizes

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Focus trap in modal
- **Color Contrast**: WCAG AA compliant colors
- **Semantic HTML**: Proper heading structure and landmarks

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is proprietary and confidential.

## Support

For technical support or questions about the website, please contact the development team.
