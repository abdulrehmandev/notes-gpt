import { UserDetailsType, UserType } from "@/lib/definitions/user";
import axios from "axios";

export async function get_user_details(username: string) {
  const { data } = await axios.get("/api/user/" + username);
  return data as UserType & { publicNotes: number };
}

/**
 * Updates user's username
 * @param {string} username - User's new username
 * @returns - Promise
 */
export async function update_user_username(username: string) {
  const { data } = await axios.patch("/api/user/username", {
    username,
  });
  return data;
}

/**
 * Updates user's details (name, phone, bio)
 * @param {object} details - Object including all the details
 * @returns - Promise
 */
export async function update_user_details(details: UserDetailsType) {
  const { data } = await axios.patch("/api/user/details", {
    ...details,
  });
  return data;
}

export async function update_user_avatar(username: string, url: string | null) {
  const { data } = await axios.post("/api/user/avatar", {
    username,
    url,
  });
  return data;
}
