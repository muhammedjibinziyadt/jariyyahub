import SubWingsSection from '@/components/sectons/SubWingsSection'
import React from 'react'
import { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/structured-data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noorululama.org';

export const metadata: Metadata = {
  title: "Sub Wings",
  description: "Explore the diverse sub wings of Noorul Ulama - specialized programs dedicated to Islamic education, cultural activities, social welfare, and student development.",
  keywords: ["sub wings", "programs", "Islamic education", "cultural activities", "student programs", "Noorul Ulama"],
  alternates: {
    canonical: `${siteUrl}/subwing`,
  },
  openGraph: {
    title: "Sub Wings | Noorul Ulama Educational Programs",
    description: "Discover our specialized programs and activities for holistic student development",
    url: `${siteUrl}/subwing`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-subwing.jpg`,
        width: 1200,
        height: 630,
        alt: "Noorul Ulama Sub Wings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sub Wings | Noorul Ulama",
    description: "Explore our diverse educational and service programs",
  },
};

const page = () => {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Sub Wings', url: `${siteUrl}/subwing` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="min-h-screen bg-background text-foreground">
        <SubWingsSection />
      </div>
    </>
  )
}

export default page
