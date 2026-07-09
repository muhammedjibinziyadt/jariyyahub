import AboutSection from "@/components/sectons/AboutSection";
import HeroSection from "@/components/sectons/HeroSection";
import CTASection from "@/components/sectons/CTASection";
import TestimonialsSection from "@/components/sectons/TestimonialsSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Jariya Hub - Islamic Excellence & Education",
  description: "Welcome to Jariya Hub official website.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
