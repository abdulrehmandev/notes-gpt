import axios from "axios";

export async function getPromptContext(message: string) {
  const res = await axios.post("/api/ai/context", { message });

  if (!res.data.context) {
    return { context: null, error: "No context found" };
  }

  return {
    context: res.data.context as string,
    error: null,
  };
}
