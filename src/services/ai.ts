import axios from "axios";

export async function getPromptContext(message: string) {
  const { data } = await axios.post("/api/ai/context", { message });

  if (!data.context) {
    return { context: null, error: "No context found" };
  }
  return {
    context: data.context,
    error: null,
  };
}
