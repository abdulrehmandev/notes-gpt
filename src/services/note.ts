import { NoteType, NotesFeedType } from "@/lib/definitions/note";
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

export async function delete_note_by_id(id: string) {
  const { data } = await axios.delete("/api/note/" + id);
  return data;
}

export async function get_public_notes_by_user_id(id: string) {
  const { data } = await axios.get("/api/note/public/" + id);
  return data as NoteType[];
}

export async function get_recent_notes() {
  const { data } = await axios.get("/api/note/recents");
  return data as NoteType[];
}

export async function update_note(
  id: string,
  note: Pick<NoteType, "title" | "content" | "isPublic" | "tags">
) {
  const { data } = await axios.post("/api/note/" + id, note);
  return data;
}

export async function get_notes(page: number = 1, take: number = 5) {
  const { data } = await axios.get(`/api/note?page=${page}&take=${take}`);
  return data as NotesFeedType;
}
