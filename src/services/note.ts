import { NoteType } from "@/lib/zod/note";
import axios from "axios";

export async function create_note(
  note: Pick<NoteType, "title" | "content" | "userId" | "tags">
) {
  const { data } = await axios.post("/api/note", note);
  return data as NoteType;
}

export async function get_note_by_id(id: string) {
  const { data } = await axios.get("/api/note/" + id);
  return data as NoteType;
}

export async function get_public_notes_by_user_id(id: string) {
  const { data } = await axios.get("/api/note/public/" + id);
  return data as NoteType[];
}

export async function get_recent_notes() {
  const { data } = await axios.get("/api/note/recents");
  return data as NoteType[];
}
