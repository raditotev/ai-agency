export const useAnalytics = () => {
  const { gtag } = useGtag()

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    gtag('event', eventName, {
      ...parameters,
      event_category: 'engagement',
      event_label:
        parameters?.service_name || parameters?.form_field || 'general',
    })
  }

  const trackServiceInquiry = (serviceName: string) => {
    gtag('event', 'service_inquiry', {
      service_name: serviceName,
      event_category: 'service_interaction',
      event_label: serviceName,
    })
  }

  const trackFormInteraction = (fieldName: string, action: string) => {
    gtag('event', 'form_interaction', {
      form_field: fieldName,
      interaction_type: action,
      event_category: 'form_engagement',
      event_label: fieldName,
    })
  }

  const trackFormSubmission = (
    success: boolean,
    serviceName?: string,
    errorMessage?: string
  ) => {
    gtag('event', success ? 'form_submit_success' : 'form_submit_error', {
      service_name: serviceName,
      error_message: errorMessage,
      event_category: 'form_conversion',
      event_label: serviceName || 'contact_form',
    })
  }

  const trackScrollDepth = (percentage: number) => {
    gtag('event', 'scroll', {
      scroll_percentage: percentage,
      event_category: 'engagement',
      event_label: `${percentage}%`,
    })
  }

  const trackModalOpen = (modalType: string, preselectedService?: string) => {
    gtag('event', 'modal_open', {
      modal_type: modalType,
      preselected_service: preselectedService,
      event_category: 'user_interaction',
      event_label: modalType,
    })
  }

  const trackModalClose = (modalType: string, reason: string) => {
    gtag('event', 'modal_close', {
      modal_type: modalType,
      close_reason: reason,
      event_category: 'user_interaction',
      event_label: modalType,
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
