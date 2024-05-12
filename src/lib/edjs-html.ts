import edjsHTML from "editorjs-html";

const checklistParser = (block: {
  type: string;
  data: {
    items: {
      text: string;
      checked: boolean;
    }[];
  };
}) => {
  const items = block.data.items
    .map(
      (item) => `<p>${item.checked ? "Done" : "Not Done"} : ${item.text}</p>`
    )
    .join(" ");
  return `<h3>Todo List</h3> ${items}`;
};

export default edjsHTML({
  checklist: checklistParser,
});
