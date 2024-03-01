import axios from "axios";
import { BookmarkType } from "@/lib/zod/bookmark";

export async function create_bookmark(noteId: string) {
  const { data } = await axios.post("/api/bookmark", { noteId });
  return data as BookmarkType;
}

export async function delete_bookmark(noteId: string) {
  const { data } = await axios.delete("/api/bookmark", { data: { noteId } });
  return data;
}

export async function get_bookmarks() {
  const { data } = await axios.get("/api/bookmark");
  return data as BookmarkType[];
}

export async function get_bookmark_by_note_id(noteId: string) {
  const { data } = await axios.get(`/api/bookmark/${noteId}`);
  return data as BookmarkType;
}
