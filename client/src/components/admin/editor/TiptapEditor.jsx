import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Toolbar from "./Toolbar";

export default function TiptapEditor({
  value,
  onChange,
}) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    editorProps: {
      attributes: {
        class:
          "min-h-[350px] p-5 outline-none prose max-w-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (
      editor &&
      value !== editor.getHTML()
    ) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border rounded-xl bg-white">

      <Toolbar editor={editor} />

      <EditorContent editor={editor} />

    </div>
  );
}