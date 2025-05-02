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
      <main className="mx-auto min-h-svh max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </section>
  );
}
