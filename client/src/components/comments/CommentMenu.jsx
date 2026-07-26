import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CommentMenu({
  canEdit,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  if (!canEdit) return null;

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 bg-white rounded-xl shadow-xl border border-gray-200 w-44 overflow-hidden z-50">

          <button
            onClick={onEdit}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={onDelete}
className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      )}
    </div>
  );
}