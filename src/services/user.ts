import { UserDetailsType, UserType } from "@/lib/zod/user";
import axios from "axios";

export async function get_user_details(username: string) {
  const { data } = await axios.get("/api/user/" + username);
  return data as UserType;
}

export async function update_user_privacy(isPrivate: boolean) {
  const { data } = await axios.patch("/api/user/privacy", {
    isPrivate,
  });
  return data;
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
