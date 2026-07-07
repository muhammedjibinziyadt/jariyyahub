/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand your content better
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Jariyya Hub Students Association',
  alternateName: 'نور العلماء',
  url: 'https://noorululama.org',
  logo: 'https://noorululama.org/logo.png',
  description: 'Jariyya Hub Students Association at Jamia Nooriyya Arabiyya Pattikkad - Empowering students through Islamic education, cultural heritage, and community service since 1985.',
  foundingDate: '1985',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Faizabad, Pattikkad PO',
    addressLocality: 'Malappuram',
    addressRegion: 'Kerala',
    postalCode: '679325',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98470-70200',
    contactType: 'General Inquiries',
    email: 'jamianooriya@gmail.com',
    availableLanguage: ['English', 'Malayalam', 'Arabic'],
  },
  sameAs: [
    // Add your social media URLs here when available
    'https://facebook.com/noorululama',
    'https://instagram.com/noorululama',
    'https://twitter.com/noorululama',
  ],
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: 'Jamia Nooriyya Arabiyya Pattikkad',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Jariyya Hub Students Association',
  url: 'https://noorululama.org',
  description: 'Official website of Jariyya Hub Students Association',
  publisher: {
    '@type': 'Organization',
    name: 'Jariyya Hub Students Association',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://noorululama.org/search?q={search_term_string}',
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
      streetAddress: 'Faizabad, Pattikkad PO',
      addressLocality: 'Malappuram',
      addressRegion: 'Kerala',
      postalCode: '679325',
      addressCountry: 'IN',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Jariyya Hub Students Association',
    url: 'https://noorululama.com',
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
    name: 'Jariyya Hub Students Association',
    url: 'https://noorululama.org',
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

