// Single source of truth for the service catalogue.
// Consumed by Services.vue (cards), ContactModal.vue (select) and
// useStructuredData.ts (SEO schema) so a new service is added in one place.

export type ServiceCategory = 'Build' | 'Integrate' | 'Advise'

export interface Service {
  id: string
  title: string
  tag: string
  category: ServiceCategory
  description: string
  icon: string
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Build',
  'Integrate',
  'Advise',
]

export const SERVICES: Service[] = [
  {
    id: 'fine-tuned-models',
    title: 'Custom Fine-Tuned Models',
    tag: 'Fine-tuning',
    category: 'Build',
    description:
      'Models trained on your data for the tasks generic ones get wrong: your terminology, your formats, your edge cases.',
    icon: 'tune',
  },
  {
    id: 'rag',
    title: 'Retrieval-Augmented Generation',
    tag: 'RAG',
    category: 'Build',
    description:
      'Answers grounded in your own documents and databases, with citations, so staff and customers can trust what comes back.',
    icon: 'layers',
  },
  {
    id: 'automations',
    title: 'AI Automations',
    tag: 'Automation',
    category: 'Integrate',
    description:
      'Workflows that run themselves: routing, extraction, drafting and handoffs wired into the systems you already run.',
    icon: 'loop',
  },
  {
    id: 'private-ai',
    title: 'Private AI',
    tag: 'On-premise',
    category: 'Integrate',
    description:
      'Deployments that keep sensitive data inside your network, on your hardware, with the compliance trail to prove it.',
    icon: 'shield',
  },
  {
    id: 'chatbots',
    title: 'Chatbots and Agents',
    tag: 'Conversational',
    category: 'Build',
    description:
      'Assistants for support, lead capture and internal tools that hold context, know your policies and hand over cleanly.',
    icon: 'chat',
  },
  {
    id: 'mcp-servers',
    title: 'MCP Servers for Your Tools',
    tag: 'MCP',
    category: 'Integrate',
    description:
      'An MCP server around the systems you already run, so AI assistants can read and act on them under your access rules.',
    icon: 'hub',
  },
  {
    id: 'digital-workers',
    title: 'Digital Workers',
    tag: 'Task agents',
    category: 'Integrate',
    description:
      'Agents that pick up the everyday work, inbox triage, data entry, reporting, follow-ups, and hand back only what needs a human.',
    icon: 'tasks',
  },
  {
    id: 'consulting',
    title: 'AI Consulting',
    tag: 'Consulting',
    category: 'Advise',
    description:
      'An honest read on where AI pays off in your operations, what it will cost, and what to leave alone for now.',
    icon: 'compass',
  },
]
