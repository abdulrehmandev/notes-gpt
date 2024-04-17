import { db } from "@/lib/db";
import edjsHTML from "editorjs-html";

export async function GET(req: Request) {
  try {
    const editorjsData = {
      time: 1589651463720,
      blocks: [
        {
          type: "paragraph",
          data: {
            text: "some text",
          },
        },
        {
          type: "paragraph",
          data: {
            text: "more text",
          },
        },
        {
          type: "paragraph",
          data: {
            text: "some more text",
          },
        },
      ],
    };

    const edjsParser = edjsHTML();
    return new Response(
      JSON.stringify(edjsParser.parse(editorjsData).join(" ")),
      {
        status: 200,
      }
    );
  } catch (error) {}
}
