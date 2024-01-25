import type { EditorConfig } from "@editorjs/editorjs";

import Checklist from "@editorjs/checklist";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Table from "@editorjs/table";

export const EditorJSConfig: EditorConfig = {
  tools: {
    header: {
      class: Header,
      config: {
        levels: [2, 3, 4],
        defaultLevel: 2,
        placeholder: "Enter a heading",
      },
    },
    linkTool: {
      class: Link,
      config: {
        endpoint: "/api/link",
      },
    },
    list: List,
    inlineCode: InlineCode,
    table: Table,
    checklist: Checklist,
    paragraph: Paragraph,
    quote: Quote,
  },
};
