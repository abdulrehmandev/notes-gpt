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
import { toast } from "sonner";
import type EditorJS from "@editorjs/editorjs";
import type { Session } from "next-auth";

import { NoteType } from "@/lib/definitions/note";
import { Button } from "../ui/Button";
import { create_note, update_note } from "@/services/note";
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
    mutationFn: (data: any) => create_note(data),
    onSuccess: (data: NoteType) => {
      router.push("/note/" + data.id);
    },
  });

  const updateNoteMutation = useMutation(
    ["updateNote"],
    (data: any) => update_note(note?.id!, data),
    {
      onSuccess: () => {
        router.push("/note/" + note?.id);
        toast.success("Note updated successfully!");
      },
    }
  );

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

    if (ref.current === undefined) {
      return null;
    }

    const blocks = await ref.current?.save();

    if (!noteData.title) {
      setError("Please add a title!");
      return;
    }

    if (blocks?.blocks?.length === 0) {
      setError("Please add some content!");
      return;
    }

    if (note?.id) {
      await updateNoteMutation.mutate({ ...noteData, content: blocks });
    } else {
      createNote({ ...noteData, content: blocks });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <form
      className="flex flex-col md:flex-row gap-4 py-4 px-4 md:pr-6"
      onSubmit={handleSubmit}
      onChange={() => setError(null)}
    >
      <div className="w-full flex flex-col md:max-w-5xl">
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
          className="py-4 w-fit md:min-w-[500px] pl-2 md:pl-6 lg:pl-12 px-2 md:px-4"
        />
        <Button
          className="hidden md:flex mr-auto ml-2 md:ml-6 lg:ml-12 mt-6"
          loading={isLoading || updateNoteMutation.isLoading}
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

      <Button
        className="md:hidden mr-auto"
        loading={isLoading || updateNoteMutation.isLoading}
      >
        Save
      </Button>
    </form>
  );
};

export default CreateNoteForm;
