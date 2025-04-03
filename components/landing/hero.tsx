import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Author } from "@/components/landing/author";
import { FileCode2, Triangle } from "lucide-react";

export default function Hero() {
  return (
    <section className="container flex flex-col items-center gap-4 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
        <h1 className="text-5xl/[1.1] font-extrabold md:text-5xl lg:text-6xl lg:leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-primary to-zinc-600">
          Next Boilerplate
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          This modern Full Stack{" "}
          <Link href="https://nextjs.org/docs" className=" text-primary font-semibold">
            Next.js
          </Link>{" "}
          solution is open-source and reusable, enabling developers to build web
          applications quickly and efficiently with{" "}
          <Link
            href="https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql"
            className=" text-indigo-700 font-semibold"
          >
            Prisma ORM - PostgreSQL
          </Link>
          ,{" "}
          <Link
            href="https://authjs.dev/getting-started"
            className="text-violet-700 font-semibold"
          >
            Auth.js
          </Link>
          , and a responsive{" "}
          <Link href="https://ui.shadcn.com/" className="text-primary font-semibold">
            Shadcn/UI {" "}
          </Link>
          interface.
        </p>
        <p className="max-w-[750px] text-md text-muted-foreground">
          Powered by <Author />
        </p>
      </div>
      <div className="grid grid-cols md:grid-cols-2 gap-4">
        <div>
          <Button size="lg">
            <FileCode2 />
            <Link href="https://github.com/ekovegeance/next-boilerplate">
              Get Started
            </Link>
          </Button>
        </div>
        <div>
          <Button size="lg" variant="secondary">
            <Triangle />
            <Link href="https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fekovegeance%2FFullstack-Nextjs-Templates">
              Deploy Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
