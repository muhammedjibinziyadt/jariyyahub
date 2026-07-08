import AboutSection from "@/components/sectons/AboutSection";
import HeroSection from "@/components/sectons/HeroSection";
import CTASection from "@/components/sectons/CTASection";
import TestimonialsSection from "@/components/sectons/TestimonialsSection";
import BannerSection from "@/components/sectons/BannerSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Jariyya Hub - Islamic Excellence & Education",
  description: "Welcome to Jariyya Hub Students Association at Jamia Nooriyya Arabiyya Pattikkad. Join us in our journey of Islamic education, cultural preservation, and community service.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <BannerSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
