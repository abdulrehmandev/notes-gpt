"use client";

import {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import type EditorJS from "@editorjs/editorjs";
import type { Session } from "next-auth";

import { NoteType } from "@/lib/definitions/note";
import { Button } from "../ui/Button";
import { create_note } from "@/services/note";
import { Alert } from "../ui/Alert";
import { EditorJSConfig } from "@/lib/editorjs-tools";
import { Separator } from "../ui/Separator";
import { TagInput } from "./Tag";
import { Label } from "../ui/Label";
import { Switch } from "../ui/Switch";

interface CreateNoteProps {
  session: Session;
  note?: NoteType;
}

const CreateNoteForm: FC<CreateNoteProps> = ({ session, note }) => {
  const ref = useRef<EditorJS>();

  const router = useRouter();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [noteData, setNoteData] = useState<
    Pick<NoteType, "title" | "content" | "userId" | "tags" | "isPublic">
  >({
    title: note ? note.title : "",
    content: note ? note.content : { blocks: [] },
    tags: note ? note.tags : [],
    isPublic: note ? note.isPublic : false,
    userId: session?.user.id,
  });

  const { mutate: createNote, isLoading } = useMutation({
    mutationKey: ["createNote"],
    mutationFn: () => create_note(noteData),
    onSuccess: (data: NoteType) => {
      router.push("/note/" + data.id);
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
        data: noteData.content || { blocks: [] },
        tools: EditorJSConfig.tools,
        onChange: () => {
          setError(null);
        },
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

    const blocks = await ref.current?.save();

    if (!noteData.title) {
      setError("Please add a title!");
      return;
    }

    if (blocks?.blocks?.length === 0) {
      setError("Please add some content!");
      return;
    }

    setNoteData((prevState) => ({ ...prevState, content: blocks }));
  };

  useEffect(() => {
    if (noteData.content.blocks?.length > 0) {
      createNote();
    }
  }, [noteData.content]);

  if (!isMounted) {
    return null;
  }

  return (
    <form
      className="flex flex-col md:flex-row gap-4 p-4 pr-4 md:pr-6"
      onSubmit={handleSubmit}
      onChange={() => setError(null)}
    >
      <div className="w-full flex flex-col max-w-5xl">
        {error && (
          <Alert
            variant={"destructive"}
            className="mb-6 w-full md:w-fit mx-auto"
          >
            {error || "Fill in all the fields"}
          </Alert>
        )}
        <input
          className="focus:outline-none w-full px-2 md:px-6 lg:px-12 py-3 font-semibold text-4xl placeholder:text-zinc-300 rounded-lg"
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
          className="min-h-[300px] py-4 w-full pl-2 md:pl-6 lg:pl-12 px-2 md:px-4"
        />
        <Button
          className="hidden md:flex mr-auto ml-2 md:ml-6 lg:ml-12 mt-6"
          loading={isLoading}
        >
          Save
        </Button>
      </div>
      <div className="w-full md:w-96 mt-4 h-fit border space-y-4 rounded-lg p-5">
        <div className="w-full flex items-center justify-between">
          <Label>Public</Label>
          <Switch
            checked={noteData.isPublic}
            onCheckedChange={(val) =>
              setNoteData((prevState) => ({ ...prevState, isPublic: val }))
            }
          />
        </div>
        <Separator />
        <TagInput
          onValueChange={(val) =>
            setNoteData((prevState) => ({ ...prevState, tags: val }))
          }
          value={noteData.tags || []}
        />
      </div>

      <Button className="md:hidden mr-auto" loading={isLoading}>
        Save
      </Button>
    </form>
  );
};

export default CreateNoteForm;
