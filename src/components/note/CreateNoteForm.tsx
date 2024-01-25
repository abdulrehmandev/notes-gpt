"use client";

import {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation } from "react-query";
import type EditorJS from "@editorjs/editorjs";
import type { Session } from "next-auth";

import { NoteType } from "@/lib/zod/note";
import { Button } from "../ui/Button";
import { create_note } from "@/services/note";
import { Alert } from "../ui/Alert";
import { useRouter } from "next/navigation";
import { EditorJSConfig } from "@/lib/editorjs-tools";
import { Separator } from "../ui/Separator";

interface CreateNoteProps {
  session: Session;
}

const CreateNoteForm: FC<CreateNoteProps> = ({ session }) => {
  const ref = useRef<EditorJS>();

  const router = useRouter();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [noteData, setNoteData] = useState<
    Pick<NoteType, "title" | "content" | "userId">
  >({
    title: "",
    content: {},
    userId: session?.user.id,
  });

  const { mutate: createNote, isLoading } = useMutation({
    mutationKey: ["createNote"],
    mutationFn: () => create_note(noteData),
    onSuccess: (data: NoteType) => {
      router.push("/app/note/" + data.id);
    },
  });

  const initEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Start typing or press tab for options...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: EditorJSConfig.tools,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initEditor();
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initEditor]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await ref.current
      ?.save()
      .then((blocks) =>
        setNoteData((prevState) => ({ ...prevState, content: blocks }))
      );

    if (!noteData.title) {
      setError("Please add a title!");
      return;
    }

    if (!noteData.content.time) {
      setError("Please add some content!");
      return;
    }

    createNote();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <form
      className="flex gap-4"
      onSubmit={handleSubmit}
      onChange={() => setError(null)}
    >
      <div className="w-full flex flex-col max-w-5xl">
        {error && (
          <Alert variant={"destructive"} className="mb-6 w-fit mx-auto">
            {error || "Fill in all the fields"}
          </Alert>
        )}
        <input
          className="focus:outline-none w-full px-2 md:px-6 lg:px-12 py-3 font-semibold text-4xl placeholder:text-zinc-200 rounded-lg"
          placeholder="Give me a title..."
          value={noteData.title}
          onChange={(e) =>
            setNoteData((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
        <div
          id="editor"
          className="min-h-[300px] py-4 w-full max-w-[700px] pl-2 md:pl-6 lg:pl-12 px-2 md:px-4"
        />
        <Button
          className="mr-auto ml-2 md:ml-6 lg:ml-12 mt-6"
          loading={isLoading}
        >
          Save
        </Button>
      </div>
      <div className="w-96"></div>
    </form>
  );
};

export default CreateNoteForm;
