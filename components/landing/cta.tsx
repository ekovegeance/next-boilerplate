import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="text-3xl/[1.1] font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Start Building with Our Full Stack Solution
        </h2>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Join developers and teams worldwide using this reusable Full Stack
          project to create powerful and efficient web applications with ease.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="https://github.com/ekovegeance/next-boilerplate">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
