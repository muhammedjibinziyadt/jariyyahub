/**
 * Analytics and Performance Monitoring Setup
 * 
 * This file contains analytics tracking functions and performance monitoring.
 * Integrate with Google Analytics, Plausible, or your preferred analytics service.
 */

// Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Event tracking types
type GTagEvent = {
  action: string
  category: string
  label: string
  value?: number
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track specific user actions
export const trackEvent = {
  // Contact form submission
  contactForm: () => {
    event({
      action: 'submit_form',
      category: 'Contact',
      label: 'Contact Form Submission',
    })
  },

  // Navigation clicks
  navigation: (destination: string) => {
    event({
      action: 'click',
      category: 'Navigation',
      label: destination,
    })
  },

  // External link clicks
  externalLink: (url: string) => {
    event({
      action: 'click',
      category: 'External Link',
      label: url,
    })
  },

  // Social media clicks
  socialMedia: (platform: string) => {
    event({
      action: 'click',
      category: 'Social Media',
      label: platform,
    })
  },

  // Download tracking
  download: (fileName: string) => {
    event({
      action: 'download',
      category: 'Downloads',
      label: fileName,
    })
  },

  // Video interactions
  videoPlay: (videoTitle: string) => {
    event({
      action: 'play',
      category: 'Video',
      label: videoTitle,
    })
  },

  // Search queries
  search: (query: string) => {
    event({
      action: 'search',
      category: 'Site Search',
      label: query,
    })
  },

  // CTA button clicks
  ctaClick: (buttonName: string) => {
    event({
      action: 'click',
      category: 'CTA',
      label: buttonName,
    })
  },
}

// Performance monitoring
export const reportWebVitals = (metric: { name: string; value: number; id: string }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric)
  }
}

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params: Record<string, any>
    ) => void
  }
}

// Alternative: Plausible Analytics (privacy-friendly)
export const plausible = {
  trackPageview: () => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('pageview')
    }
  },

  trackEvent: (eventName: string, props?: Record<string, string | number | boolean>) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props })
    }
  },
}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void
  }
}

