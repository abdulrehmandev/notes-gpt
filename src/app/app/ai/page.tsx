"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useChat } from "ai/react";
import { useMutation } from "react-query";
import { nanoid } from "nanoid";
import TextareaAutoSize from "react-textarea-autosize";
import { AlertCircle, ArrowUp } from "lucide-react";

import Message from "@/components/chat/Message";
import { Button } from "@/components/ui/Button";
import { getPromptContext } from "@/services/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";

import { toast } from "sonner";

const AiPage = () => {
  const { data: session } = useSession();

  const chatBoxRef = React.useRef<HTMLDivElement | null>(null);
  const [promptInput, setPromptInput] = React.useState<string>("");
  const [loadingState, setLoadingState] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const contextQuery = useMutation({
    mutationKey: ["context"],
    mutationFn: async (msg: string) => getPromptContext(msg),
    onError: (error) => {
      setLoadingState(false);
      toast.error("An error occured while fetching context", {
        position: "top-right",
      });
      setError("An error occured while fetching context");
    },
    onSuccess: (data) => {
      if (data?.error || !data?.context) {
        return;
      }

      const contentWithContext = `Use the following peice of context to answer the users questions in markdown format. If you don't find the answer to user's question from the context or user's previous conversation, just say that you don't have enough information, don't try to make up an answer. Also only answer from the context or previous conversations, do not elongate the conversation by adding more and more things from your self. 
Context: ${data.context}`;

      setMessages([
        { id: nanoid(), role: "system", content: contentWithContext },
        { id: nanoid(), role: "user", content: promptInput },
      ]);
      reload();

      setPromptInput("");
    },
  });

  const {
    messages,
    isLoading,
    append,
    setMessages,
    reload,
    error: chatError,
  } = useChat({
    api: "/api/ai/chat",
  });

  console.log(messages);

  useEffect(() => {
    if (chatBoxRef.current) {
      const maxScrollTop =
        chatBoxRef.current.scrollHeight - chatBoxRef.current.clientHeight;
      chatBoxRef.current.scrollTo({
        top: maxScrollTop > 0 ? maxScrollTop : 0,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    setLoadingState(isLoading);

    if (chatError) {
      setError(chatError.message);
    }
  }, [isLoading, chatError]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!promptInput) {
      return;
    }

    if (messages.length === 0) {
      setLoadingState(true);
      await contextQuery.mutate(promptInput);
      return;
    }

    append({ role: "user", content: promptInput });
    setPromptInput("");
  };

  return (
    <main className="py-4 w-full h-[calc(100vh-56px)] md:h-screen relative mx-auto md:px-8 overflow-hidden">
      {messages.length === 0 ? (
        <div className="h-full max-h-[500px] w-full flex flex-col gap-2 items-center justify-center text-center px-4">
          <h4 className="font-medium tracking-tighter text-zinc-700 text-3xl">
            How can I help you today?
          </h4>
          <p className="text-zinc-500 max-w-lg">
            Ask me anything about what you have saved and I will find it so you
            don&apos;t have to waste time looking for it
          </p>
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
        {error && (
          <Alert className="w-fit mx-auto mb-3 max-w-xl" variant="destructive">
            <AlertCircle size={20} />
            <AlertTitle>{error}</AlertTitle>
            <AlertDescription>
              Try rephrasing your question or ask something else. To remove this
              error message, click on the input box and start typing
            </AlertDescription>
          </Alert>
        )}
        <form
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleFormSubmit(event);
            }
          }}
          onSubmit={handleFormSubmit}
          onChange={() => setError("")}
          className="relative mx-auto px-2 max-w-3xl flex items-center gap-2"
        >
          <TextareaAutoSize
            className="w-full flex justify-between items-center pl-5 pr-10 py-[14px] border rounded-[28px] text-base min-h-[56px] max-h-40 focus:ring-[3px] focus:ring-blue-100 focus:outline-none scrollbar"
            maxRows={3}
            minLength={10}
            placeholder="Start asking..."
            name="prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <Button
            size="icon"
            className="bg-blue-500 hover:bg-blue-500/90 h-10 w-10 text-white rounded-full absolute bottom-2 right-[18px]"
            loading={loadingState}
            // disabled={promptInput.length === 0 || loadingState}
            type="submit"
            id="message-input-submit-button"
          >
            <ArrowUp size={20} />
          </Button>
        </form>
        <p className="text-xs font-light text-center text-zinc-500 mt-2">
          <span className="font-medium">Remember:</span> Your chat with me will
          reset as you leave
        </p>
      </div>
    </main>
  );
};

export default AiPage;
