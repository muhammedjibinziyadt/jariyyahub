/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand your content better
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Jariya Hub',
  alternateName: 'جارية هب',
  url: 'https://jariyahub.online',
  logo: 'https://jariyahub.online/logo.png',
  description: 'Jariya Hub website is a doantion website',
  foundingDate: '2026',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pulpatta',
    addressLocality: 'Malappuram',
    addressRegion: 'Kerala',
    postalCode: '679325',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-828010-2606',
    contactType: 'General Inquiries',
    email: 'jariyahub@gmail.com',
    availableLanguage: ['English', 'Malayalam', 'Arabic'],
  },
  sameAs: [
    // Add your social media URLs here when available
    'https://facebook.com/jariyahub',
    'https://instagram.com/jariyahub',
    'https://twitter.com/jariyahub',
  ],
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: 'Jariya Hub',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Jariya Hub',
  url: 'https://jariyahub.online',
  description: 'Official website of Jariya Hub',
  publisher: {
    '@type': 'Organization',
    name: 'Jariya Hub',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://jariyahub.online/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const eventSchema = (event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate || event.startDate,
  location: {
    '@type': 'Place',
    name: event.location,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pulpatta',
      addressLocality: 'Malappuram',
      addressRegion: 'Kerala',
      postalCode: '679325',
      addressCountry: 'IN',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Jariyya Hub',
    url: 'https://jariyahub.com',
  },
})

export const personSchema = (person: {
  name: string
  jobTitle: string
  description: string
  image?: string
  email?: string
  telephone?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.jobTitle,
  description: person.description,
  image: person.image,
  email: person.email,
  telephone: person.telephone,
  affiliation: {
    '@type': 'Organization',
    name: 'Jariya Hub',
    url: 'https://jariyahub.online',
  },
})

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

