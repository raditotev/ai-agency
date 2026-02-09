/** Provided by @nuxtjs/plausible (auto-imported) */
declare function useTrackEvent(
  eventName: string,
  options?: { props?: Record<string, string> }
): void

export const useAnalytics = () => {
  function safeTrack(
    eventName: string,
    options?: { props?: Record<string, string> }
  ) {
    if (import.meta.client) {
      useTrackEvent(eventName, { props: options?.props ?? {} })
    }
  }

  const trackEvent = (
    eventName: string,
    parameters?: Record<string, string | undefined>
  ) => {
    const props =
      parameters &&
      Object.fromEntries(
        Object.entries(parameters).filter(
          (entry): entry is [string, string] => entry[1] != null
        )
      )
    safeTrack(eventName, { props })
  }

  const trackServiceInquiry = (serviceName: string) => {
    safeTrack('Service Inquiry', { props: { service: serviceName } })
  }

  const trackFormInteraction = (fieldName: string, action: string) => {
    safeTrack('Form Interaction', {
      props: { field: fieldName, action },
    })
  }

  const trackFormSubmission = (
    success: boolean,
    serviceName?: string,
    errorMessage?: string
  ) => {
    const props: Record<string, string> = {}
    if (serviceName) props.service = serviceName
    if (errorMessage) props.error = errorMessage
    safeTrack(success ? 'Form Submit Success' : 'Form Submit Error', { props })
  }

  const trackScrollDepth = (percentage: number) => {
    safeTrack('Scroll', {
      props: { depth: `${percentage}%` },
    })
  }

  const trackModalOpen = (modalType: string, preselectedService?: string) => {
    const props: Record<string, string> = { modal: modalType }
    if (preselectedService) props.service = preselectedService
    safeTrack('Modal Open', { props })
  }

  const trackModalClose = (modalType: string, reason: string) => {
    safeTrack('Modal Close', {
      props: { modal: modalType, reason },
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
