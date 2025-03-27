import Footer from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import React from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <main className="max-w-7xl mx-auto min-h-svh py-6 sm:px-6 px-4 lg:px-8 pt-20">
        {children}
      </main>
      <Footer />
    </section>
  );
}
