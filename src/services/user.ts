import { UserType } from "@/lib/zod/user";
import axios from "axios";

export async function get_user_details(username: string) {
  const { data } = await axios.get("/api/user/" + username);
  return data as UserType;
}
