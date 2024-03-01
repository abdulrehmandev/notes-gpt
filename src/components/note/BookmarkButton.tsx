import React from "react";
import { useMutation, useQuery } from "react-query";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { Button, ButtonProps } from "../ui/Button";
import {
  create_bookmark,
  delete_bookmark,
  get_bookmark_by_note_id,
} from "@/services/bookmark";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";

interface BookmarkButtonProps extends ButtonProps {
  noteId: string;
  iconSize?: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  noteId,
  iconSize,
  ...props
}) => {
  const bookmarkQuery = useQuery(
    ["getBookmarks", noteId],
    () => get_bookmark_by_note_id(noteId),
    {
      retry: false,
    }
  );

  const createBookmarkMutation = useMutation(
    ["createBookmark", noteId],
    () => create_bookmark(noteId),
    {
      onSuccess: () => bookmarkQuery.refetch(),
    }
  );

  const deleteBookmarkMutation = useMutation(
    ["deleteBookmark", noteId],
    () => delete_bookmark(noteId),
    {
      onSuccess: () => bookmarkQuery.refetch(),
    }
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              if (bookmarkQuery.data) {
                deleteBookmarkMutation.mutate();
              } else createBookmarkMutation.mutate();
            }}
            loading={
              createBookmarkMutation.isLoading ||
              bookmarkQuery.isLoading ||
              deleteBookmarkMutation.isLoading
            }
            {...props}
          >
            {bookmarkQuery.data ? (
              <BookmarkCheck size={iconSize || 16} />
            ) : (
              <Bookmark size={iconSize || 16} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {bookmarkQuery.data ? "Remove from bookmarks" : "Add to Bookmarks"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookmarkButton;
