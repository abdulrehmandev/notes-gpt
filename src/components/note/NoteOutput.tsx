"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface NoteOutputProps {
  content: any;
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginBottom: "1rem",
  },
  checklist: {
    container: { marginBlock: "1rem", marginLeft: "1.5rem" },
    item: {
      fontWeight: "500",
      marginBottom: "0.5rem",
    },
    label: {},
  },
  list: {
    container: {},
    listItem: {},
  },
  table: {
    table: {},
    tr: {},
    th: {},
    td: {},
  },
  quote: {
    container: {},
    content: {},
    author: {},
    message: {},
  },
  linkTool: {
    container: {},
    textHolder: {},
    title: {},
    description: {},
    image: {},
    siteName: {},
  },
};

const NoteOutput: FC<NoteOutputProps> = ({ content }) => {
  return (
    <section className="my-6">
      <Output style={style} data={content} />
    </section>
  );
};

export default NoteOutput;
