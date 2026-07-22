import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
} from "lucide-react";

export default function Toolbar({ editor }) {
  if (!editor) return null;

  const btn =
    "p-2 rounded hover:bg-gray-100 transition";

  return (
    <div className="flex flex-wrap gap-2 border-b p-3">

      <button
        type="button"
        className={btn}
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        <Bold size={18} />
      </button>

      <button
        type="button"
        className={btn}
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
      >
        <Italic size={18} />
      </button>

      <button
        type="button"
        className={btn}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 size={18} />
      </button>

      <button
        type="button"
        className={btn}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 size={18} />
      </button>

      <button
        type="button"
        className={btn}
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <List size={18} />
      </button>

      <button
        type="button"
        className={btn}
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered size={18} />
      </button>

      <button
        type="button"
        className={btn}
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
      >
        <Quote size={18} />
      </button>

      <button
        type="button"
        className={btn}
        onClick={() =>
          editor.chain().focus().toggleCodeBlock().run()
        }
      >
        <Code2 size={18} />
      </button>

    </div>
  );
}