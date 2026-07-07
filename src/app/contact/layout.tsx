import { Metadata } from "next";
import { ReactNode } from "react";
import { breadcrumbSchema } from "@/lib/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noorululama.org';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Noorul Ulama Students Association at Jamia Nooriyya Arabiyya Pattikkad. Reach out for inquiries, support, or more information about our programs and activities.",
  keywords: ["contact", "Noorul Ulama", "Jamia Nooriyya", "Pattikkad", "Kerala", "email", "phone"],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Us | Noorul Ulama",
    description: "Get in touch with Noorul Ulama Students Association for inquiries and support",
    url: `${siteUrl}/contact`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Noorul Ulama",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Noorul Ulama",
    description: "Get in touch with Noorul Ulama Students Association",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Contact', url: `${siteUrl}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {children}
    </>
  );
}

