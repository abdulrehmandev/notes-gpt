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

export async function get_follow_requests() {
  const { data } = await axios.get(`/api/user/follow-requests`);
  return data;
}

export async function update_follow_request({
  status,
  id,
}: Pick<FollowerType, "id" | "status">) {
  const { data } = await axios.patch(`/api/user/follow-requests`, {
    status,
    id,
  });
  return data;
}

export async function delete_follow_request(id: string) {
  const { data } = await axios.delete(`/api/user/follow-requests`, {
    data: { id },
  });
  return data;
}
