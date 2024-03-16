import axios from "axios";
import { BookmarkType } from "@/lib/definitions/bookmark";
import { NotesFeedType } from "@/lib/definitions/note";

export async function create_bookmark(noteId: string) {
  const { data } = await axios.post("/api/bookmark", { noteId });
  return data as BookmarkType;
}

export async function delete_bookmark(noteId: string) {
  const { data } = await axios.delete("/api/bookmark", { data: { noteId } });
  return data;
}

export async function get_bookmarks(page: number = 1, take: number = 5) {
  const { data } = await axios.get(`/api/bookmark?page=${page}&take=${take}`);
  return data as NotesFeedType;
}

export async function get_bookmark_by_note_id(noteId: string) {
  const { data } = await axios.get(`/api/bookmark/${noteId}`);
  return data as BookmarkType;
}
