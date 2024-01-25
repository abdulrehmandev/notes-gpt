import Container from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Container className="mt-20 text-center">
        <span className="bg-white border font-semibold text-zinc-500 text-xs px-6 py-2 rounded-full shadow-lg">
          Beta version
        </span>
        <h1 className="font-bold text-4xl md:text-6xl max-w-lg mx-auto mt-8">
          Chat with your <span className="text-blue-500">notes</span>{" "}
          effectively.
        </h1>

        <p className="text-zinc-600 max-w-xl mx-auto mt-4 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <Link
          href="/auth/sign-up"
          className={cn(buttonVariants({ variant: "primary" }))}
        >
          Get started
          <ArrowRight className="inline-block ml-2" size={16} />
        </Link>
      </Container>
    </main>
  );
}
