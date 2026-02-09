# Plausible Analytics

Privacy-friendly analytics via [Plausible](https://plausible.io), using the official [@nuxtjs/plausible](https://nuxt.com/modules/plausible) Nuxt module. No cookies, no personal data collection.

## What's being tracked

1. **Page views** – Automatic (module’s `autoPageviews: true` by default).
2. **Scroll depth** – 25%, 50%, 75%, and 100% (custom event: `Scroll`).
3. **Service inquiries** – Clicks on “Inquire Now” per service (`Service Inquiry`).
4. **Contact form** – Opens, field focus/change, submit success/error, close (`Form Interaction`, `Form Submit Success`, `Form Submit Error`, `Modal Open`, `Modal Close`).

## Setup

1. Create a site at [plausible.io](https://plausible.io) and add your domain (e.g. `ai.radi.pro`).
2. Optional: set the domain in `.env` if it differs from the default (default is `window.location.hostname`):
   ```bash
   NUXT_PUBLIC_PLAUSIBLE_DOMAIN=ai.radi.pro
   ```
3. In the Plausible dashboard, add these **Custom events** (Goals) so they show in the UI:
   - `Service Inquiry`
   - `Form Interaction`
   - `Form Submit Success`
   - `Form Submit Error`
   - `Scroll`
   - `Modal Open`
   - `Modal Close`

## Custom events and props

| Event                 | When                    | Props (examples)        |
|-----------------------|-------------------------|--------------------------|
| Service Inquiry       | “Inquire Now” clicked   | `service`                |
| Form Interaction      | Field focus/change      | `field`, `action`        |
| Form Submit Success   | Contact form submitted  | `service` (optional)     |
| Form Submit Error     | Submit failed           | `service`, `error`       |
| Scroll                | Scroll milestone hit    | `depth` (e.g. `"50%"`)   |
| Modal Open            | Contact modal opened    | `modal`, `service`       |
| Modal Close           | Contact modal closed    | `modal`, `reason`       |

## Local development

The module is configured with **`ignoredHostnames: []`** in `nuxt.config.ts`, so events are sent from localhost and analytics work in development. To disable local tracking, set `ignoredHostnames: ['localhost']` (or add back the default) in the `plausible` config.

## Optional: proxy (avoid ad-blockers)

To send events via your server and reduce ad-blocker impact, enable the module’s proxy in `nuxt.config.ts`:

```ts
plausible: {
  ignoredHostnames: [],
  proxy: true,
}
```

Events will be sent to `/_plausible` on your origin, then forwarded to Plausible. You can change the path with `proxyBaseEndpoint` (default `'/_plausible'`).
