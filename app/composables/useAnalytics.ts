// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (process.client && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        event_category: 'engagement',
        event_label:
          parameters?.service_name || parameters?.form_field || 'general',
      })
    }
  }

  const trackServiceInquiry = (serviceName: string) => {
    trackEvent('service_inquiry', {
      service_name: serviceName,
      event_category: 'service_interaction',
    })
  }

  const trackFormInteraction = (fieldName: string, action: string) => {
    trackEvent('form_interaction', {
      form_field: fieldName,
      interaction_type: action,
      event_category: 'form_engagement',
    })
  }

  const trackFormSubmission = (
    success: boolean,
    serviceName?: string,
    errorMessage?: string
  ) => {
    trackEvent('form_submission', {
      success,
      service_name: serviceName,
      error_message: errorMessage,
      event_category: 'form_conversion',
    })
  }

  const trackScrollDepth = (percentage: number) => {
    trackEvent('scroll_depth', {
      scroll_percentage: percentage,
      event_category: 'engagement',
    })
  }

  const trackModalOpen = (modalType: string, preselectedService?: string) => {
    trackEvent('modal_open', {
      modal_type: modalType,
      preselected_service: preselectedService,
      event_category: 'user_interaction',
    })
  }

  const trackModalClose = (modalType: string, reason: string) => {
    trackEvent('modal_close', {
      modal_type: modalType,
      close_reason: reason,
      event_category: 'user_interaction',
    })
  }

  return {
    trackEvent,
    trackServiceInquiry,
    trackFormInteraction,
    trackFormSubmission,
    trackScrollDepth,
    trackModalOpen,
    trackModalClose,
  }
}
