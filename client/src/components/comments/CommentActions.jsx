import { Heart, MessageCircle } from "lucide-react";

export default function CommentActions({
  likes = 0,
  onLike,
  onReply,
}) {
  return (
    <div className="flex items-center gap-8 mt-5">

      <button
        onClick={onLike}
        className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
      >
        <Heart size={18} />

        <span>{likes}</span>
      </button>

      <button
        onClick={onReply}
        className="flex items-center gap-2 text-gray-500 hover:text-violet-700 transition"
      >
        <MessageCircle size={18} />

        Reply
      </button>

    </div>
  );
}