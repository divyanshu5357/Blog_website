import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

export default function EmojiPickerButton({
  setCommentForm,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <Smile size={20} />
      </button>

      {open && (
        <div className="absolute bottom-12 left-0 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setCommentForm((prev) => ({
                ...prev,
                content:
                  prev.content + emojiData.emoji,
              }));
            }}
          />
        </div>
      )}

    </div>
  );
}