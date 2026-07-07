import { Metadata } from "next";
import { ReactNode } from "react";
import { breadcrumbSchema } from "@/lib/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noorululama.org';

export const metadata: Metadata = {
  title: "Core Committee",
  description: "Meet the dedicated leaders of Noorul Ulama Students Association. Our core committee works tirelessly to serve the student community and uphold Islamic values and educational excellence.",
  keywords: ["core committee", "leadership", "student leaders", "Noorul Ulama", "president", "secretary"],
  alternates: {
    canonical: `${siteUrl}/core`,
  },
  openGraph: {
    title: "Core Committee | Noorul Ulama Leadership Team",
    description: "Meet our dedicated student leaders serving the Noorul Ulama community",
    url: `${siteUrl}/core`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-core.jpg`,
        width: 1200,
        height: 630,
        alt: "Noorul Ulama Core Committee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Core Committee | Noorul Ulama",
    description: "Meet our dedicated student leadership team",
  },
};

export default function CoreLayout({ children }: { children: ReactNode }) {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Core Committee', url: `${siteUrl}/core` },
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

