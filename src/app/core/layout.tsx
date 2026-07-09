import { Metadata } from "next";
import { ReactNode } from "react";
import { breadcrumbSchema } from "@/lib/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jariyyahub.online';

export const metadata: Metadata = {
  title: "Official Website | Jariyya Hub",
  description: "Explore the official platform of Jawharathul Uloom Suffa Dars at www.jawharathululoomsuffadars.online.",
  keywords: ["official website", "live platform", "Jawharathul Uloom", "Suffa Dars", "Jariyya Hub"],
  alternates: {
    canonical: `${siteUrl}/core`,
  },
  openGraph: {
    title: "Official Website | Jariyya Hub",
    description: "Explore the official platform of Jawharathul Uloom Suffa Dars.",
    url: `${siteUrl}/core`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/site_preview.png`,
        width: 1200,
        height: 630,
        alt: "Jawharathul Uloom Suffa Dars Website Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Website | Jariyya Hub",
    description: "Explore the official platform of Jawharathul Uloom Suffa Dars.",
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

