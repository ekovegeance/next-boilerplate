import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import CTA from "@/components/landing/cta";

export default function Home() {
  
  return (
      <main className="md:pt-24">
        <Hero />
        <Features />
        <CTA />
      </main>

  );
}
