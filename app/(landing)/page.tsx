import { Container } from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Container className="min-h-screen py-20 md:py-28 lg:py-32">
        <div className="w-full text-center">
          <h1 className="font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl mx-auto mb-6 lg:mb-8">
            A note-taking tool <br />
            <span className="text-primary">with some magic</span>
          </h1>
          <p className="max-w-lg lg:max-w-2xl mx-auto font-medium text-sm lg:text-base">
            Revolutionize your notes with AI-powered magic.{" "}
            <br className="hidden md:block" />
            Discover the power of NotesGPT, an AI-driven note management
            application that leverages the efficiency of AI for seamless note
            retrieval.
          </p>
          <div className="flex items-center gap-3 justify-center mt-6 lg:mt-8">
            <Link href="/" className={cn(buttonVariants())}>
              Get Started
            </Link>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              About NotesGPT
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
