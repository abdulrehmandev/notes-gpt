import Container from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronRight,
  Github,
  GithubIcon,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Container className="mt-20 text-center">
        <span className="bg-white border font-semibold text-zinc-500 text-xs px-6 py-2 rounded-full shadow-md">
          Beta version
        </span>
        <h1 className="font-medium tracking-tighter text-4xl md:text-6xl max-w-lg mx-auto mt-8">
          Chat with your <span className="text-blue-500">notes</span>{" "}
          effectively
        </h1>

        <p className="text-zinc-600 max-w-lg mx-auto mt-4 mb-6">
          Easily access and organize your notes with our AI assistant. Enhance
          your workflow with NoteGPT.
        </p>

        <Link
          href="/auth/sign-up"
          className={cn(buttonVariants({ variant: "primary" }))}
        >
          Get started
          <ArrowRight className="inline-block ml-2" size={16} />
        </Link>

        {/* preview image */}
        <div>
          <div className="relative isolate">
            <Image
              className="absolute hidden md:block -top-[173px] left-12"
              src="/images/peek.avif"
              width={256}
              height={173}
              alt="peek"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>

            <div>
              <div className="mx-auto max-w-6xl lg:px-8">
                <div className="mt-16 flow-root sm:mt-24">
                  <div className="-m-2 rounded-xl bg-zinc-900/5 p-2 ring-1 ring-inset ring-zinc-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image
                      src="/images/app-preivew.png"
                      alt="product preview"
                      width={1364}
                      height={866}
                      quality={100}
                      className="rounded-md bg-white p-2 sm:p-4 shadow-2xl ring-1 ring-zinc-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-semibold tracking-tighter text-3xl text-zinc-900 sm:text-5xl">
                Start chatting in minutes
              </h2>
              <p className="mt-4 text-lg text-zinc-500">
                Chat with your notes in these few simple steps.
              </p>
            </div>
          </div>

          {/* steps */}
          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0 text-left">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">
                  Step 1
                </span>
                <span className="text-xl font-medium tracking-tighter">
                  Sign up for an account
                </span>
                <span className="mt-2 text-zinc-500">
                  Creating a free of cost account with us and start creating you
                  notes.
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">
                  Step 2
                </span>
                <span className="text-xl font-medium tracking-tighter">
                  Start asking questions
                </span>
                <span className="mt-2 text-zinc-500">
                  It&apos;s that simple. Try out NotesGPT today - it really
                  takes less than a few minute.
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">
                  Step 3
                </span>
                <span className="text-xl font-medium tracking-tighter">
                  Share your notes
                </span>
                <span className="mt-2 text-zinc-500">
                  You can share your notes with your anyone or hide from
                  everyone.
                </span>
              </div>
            </li>
          </ol>
        </div>

        {/* key points */}
        <section className="pb-24 pt-32 text-left max-w-5xl mx-auto">
          <div className="mb-12 px-3 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-2 font-semibold tracking-tighter text-3xl text-zinc-900 sm:text-5xl">
                Why NotesGPT?
              </h2>
              <p className="mt-4 text-lg text-zinc-500">
                Chat with your notes in these few simple steps.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center text-center md:text-left gap-12 mt-10 px-3 lg:px-8">
            <div className="space-y-4">
              <h3 className="font-medium tracking-tighter text-2xl md:text-3xl">
                Instant Answers
              </h3>
              <p className="text-base md:text-lg text-zinc-500">
                Get quick responses by chatting directly with your notes.
              </p>
            </div>
            <div className="relative w-full max-h-80 aspect-square h-full overflow-hidden rounded-xl">
              <Image
                src="/images/chat.png"
                className="object-contain rounded-xl"
                fill
                alt="chat image"
              />
            </div>
            <div className="relative w-full max-h-80 aspect-square h-full overflow-hidden rounded-xl row-start-4 md:row-start-auto">
              <Image
                src="/images/editor.png"
                className="object-contain rounded-xl"
                fill
                alt="chat image"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium tracking-tighter text-2xl md:text-3xl">
                Interactive Editor
              </h3>
              <p className="text-base md:text-lg text-zinc-500">
                Create notes effortlessly with our feature-rich editor. Add
                lists, links, and more for a dynamic note-taking experience.
              </p>
            </div>
          </div>
        </section>

        {/* cta */}
        <section className="my-24 pt-12 pb-16 text-center">
          <h2 className="font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tighter">
            Get started for free
          </h2>
          <p className="mt-3 text-zinc-500 text-lg md:text-xl">
            Play around with it and see what difference it makes
          </p>
          <Link
            href="/auth/sign-up"
            className={cn(buttonVariants({ variant: "primary" }), "mt-6")}
          >
            Sign up <ChevronRight className="ml-2" size={16} />
          </Link>

          <div className="relative w-full h-full min-h-[200px] sm:min-h-[260px] mt-6">
            <Image
              className="object-contain w-full h-full"
              src="/images/parade.webp"
              fill
              alt="peek"
            />
          </div>
        </section>

        {/* footer */}
        <footer className="flex items-center justify-between gap-3 pb-3 pt-2 text-zinc-400">
          <p className="text-[10px]">&copy; 2023 All rights reserved.</p>
          <Link
            href="https://github.com/abdulrehmandev/notes-gpt"
            className="hover:text-zinc-600"
          >
            <Github size={16} />
          </Link>
        </footer>
      </Container>
    </main>
  );
}
