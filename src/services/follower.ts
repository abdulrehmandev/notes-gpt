import { FollowerType } from "@/lib/zod/follower";
import axios from "axios";

export async function get_follower(username: string) {
  const { data } = await axios.get(`/api/user/${username}/follow`);
  return data as FollowerType;
}

export async function follow_user(username: string) {
  const { data } = await axios.post(`/api/user/${username}/follow`);
  return data;
}

export async function unfollow_user(username: string) {
  const { data } = await axios.delete(`/api/user/${username}/follow`);
  return data;
}
