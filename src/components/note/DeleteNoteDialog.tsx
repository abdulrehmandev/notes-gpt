import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/Dialoge";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/Button";
import { useMutation, useQueryClient } from "react-query";
import { delete_note_by_id } from "@/services/note";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteNoteDialogProps {
  noteId: string;
  opened: boolean;
  onOpenChange: (opened: boolean) => void;
}

const DeleteNoteDialog: React.FC<DeleteNoteDialogProps> = ({
  noteId,
  opened,
  onOpenChange,
}) => {
  const router = useRouter();

  const deleteMutation = useMutation("deleteById", {
    mutationFn: () => delete_note_by_id(noteId),
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete note");
    },
    onSuccess: () => {
      toast.success("Note deleted successfully", {
        description: "You will be redirected back to the homepage",
      });
      onOpenChange(false);
      router.push("/app");
    },
  });

  return (
    <Dialog open={opened} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this note?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={() => deleteMutation.mutate()}
            loading={deleteMutation.isLoading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNoteDialog;
