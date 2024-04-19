"use client";

import Logo from "@/components/shared/Logo";
import { ArrowUp, Send } from "lucide-react";
import React from "react";
import TextareaAutoSize from "react-textarea-autosize";

const AiPage = () => {
  return (
    <main className="p-4 w-full min-h-screen">
      <div className="max-w-3xl relative h-full mx-auto">
        <div className="h-full max-h-[500px] w-full flex flex-col gap-4 items-center justify-center text-center">
          <Logo />
          <h2 className="font-bold text-zinc-700 text-3xl">
            How can I help you today?
          </h2>
        </div>
        <div className="absolute bottom-0 mb-2 w-full">
          <div className="relative">
            <TextareaAutoSize
              className="w-full flex justify-between pl-4 pr-3 py-3 border-2 rounded-xl text-lg min-h-[56px] outline-blue-500 scrollbar"
              maxRows={3}
            />
            <button className="p-1.5 bg-blue-500 hover:bg-blue-500/90 text-white rounded-md absolute bottom-3 right-3">
              <Send size={20} />
            </button>
          </div>

          <p className="text-xs font-light text-center text-zinc-400 mt-2">
            Remember: Your chat will reset as you leave
          </p>
        </div>
      </div>
    </main>
  );
};

export default AiPage;

const QuickPrompt = ({ text }: { text: string }) => {
  return (
    <button className="border-2 w-full rounded-lg p-4 flex items-center justify-between gap-4 hover:bg-zinc-100 transition-colors group">
      <p className="font-medium">{text}</p>
      <div className="border rounded-md p-1 hidden bg-zinc-50 transition-all group-hover:block">
        <ArrowUp size={16} />
      </div>
      <span className="w-6 group-hover:hidden"></span>
    </button>
  );
};
