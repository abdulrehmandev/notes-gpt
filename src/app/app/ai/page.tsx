"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import TextareaAutoSize from "react-textarea-autosize";
import { useChat } from "ai/react";

import Message from "@/components/chat/Message";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import { getPromptContext } from "@/services/ai";
import { nanoid } from "nanoid";

const AiPage = () => {
  const { data: session } = useSession();

  const chatBoxRef = React.useRef<HTMLDivElement | null>(null);
  const [promptInput, setPromptInput] = React.useState<string>("");
  const [loadingState, setLoadingState] = React.useState<boolean>(false);

  const { messages, isLoading, append, setMessages, reload } = useChat({
    api: "/api/ai/chat",
  });

  useEffect(() => {
    if (chatBoxRef.current) {
      const maxScrollTop =
        chatBoxRef.current.scrollHeight - chatBoxRef.current.clientHeight;
      chatBoxRef.current.scrollTo({
        top: maxScrollTop > 0 ? maxScrollTop : 0,
        behavior: "smooth",
      });
    }
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!promptInput) {
      return;
    }

    setLoadingState(true);

    if (messages.length === 0) {
      const { context, error } = await getPromptContext(promptInput);

      const contentWithContext = `Use the following pieces of context (or conversations if needed) to answer the users question in markdown format. Remember: If you don't know the answer, just say that you don't know, don't try to make up an answer.
Context: ${context}`;

      setMessages([
        { id: nanoid(), role: "system", content: contentWithContext },
        { id: nanoid(), role: "user", content: promptInput },
      ]);
      reload();

      setPromptInput("");
      return;
    }

    append({ role: "user", content: promptInput });
    setPromptInput("");
  };

  return (
    <main className="py-4 w-full h-[calc(100vh-56px)] md:h-screen relative mx-auto md:px-8 overflow-hidden">
      {messages.length === 0 ? (
        <div className="h-full max-h-[500px] w-full flex flex-col gap-4 items-center justify-center text-center">
          <Logo />
          <h2 className="font-bold text-zinc-700 text-3xl">
            How can I help you today?
          </h2>
        </div>
      ) : (
        <div
          style={{ height: "80vh" }}
          ref={chatBoxRef}
          className="flex flex-col pr-1 overflow-y-auto scrollbar pb-8 md:pb-3"
        >
          {messages.map((msg, index) => (
            <Message
              session={session}
              key={msg.content.substring(0, 6) + index}
              message={msg}
            />
          ))}
        </div>
      )}
      <div className="absolute bottom-0 mb-2 w-full bg-gradient-to-t to-transparent from-80% from-white pt-6">
        <form
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleFormSubmit(event);
            }
          }}
          onSubmit={handleFormSubmit}
          className="relative max-w-3xl mx-auto px-2"
        >
          <TextareaAutoSize
            className="w-full flex justify-between items-center pl-4 pr-10 py-[14px] border-2 rounded-lg text-base min-h-[56px] outline-blue-500 scrollbar"
            maxRows={3}
            placeholder="Start asking..."
            required
            name="prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <Button
            size="icon"
            className="bg-blue-500 hover:bg-blue-500/90 text-white rounded-md absolute bottom-[10px] right-5"
            loading={loadingState}
            type="submit"
            id="message-input-submit-button"
          >
            <ArrowUpRight size={20} />
          </Button>
        </form>
        <p className="text-xs font-light text-center text-zinc-500 mt-2">
          Remember: Your chat will reset as you leave
        </p>
      </div>
    </main>
  );
};

export default AiPage;
