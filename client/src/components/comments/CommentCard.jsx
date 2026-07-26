import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import CommentAvatar from "./CommentAvatar";
import CommentMenu from "./CommentMenu";
import CommentBox from "./CommentBox";

export default function CommentCard({
  comment,
  publicUser,
  editingComment,
  editContent,
  setEditContent,
  replyingTo,
  commentForm,
  handleCommentChange,
  handleCommentSubmit,
  onUpdate,
  onCancel,
  onEdit,
  onDelete,
  onReply,
  onCancelReply, // <-- Receive new prop
}) {
  const canEdit = publicUser?.id === comment.publicUserId;
  const isEditing = editingComment === comment.id;

  const [isRepliesExpanded, setIsRepliesExpanded] = useState(false);
  const [visibleRepliesCount, setVisibleRepliesCount] = useState(4);

  const totalRepliesCount = comment.replies?.length || 0;
  const standardReplyStep = 4;

  const handleFetchNextReplies = () => {
    setVisibleRepliesCount((prev) => prev + standardReplyStep);
  };

  return (
    <div className="bg-white border-b border-gray-100 py-5 transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <CommentAvatar user={comment.publicUser} />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-sm">
                {comment.publicUser.firstName} {comment.publicUser.lastName}
              </h3>
              <span className="text-[11px] text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="edit-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-1 focus:ring-violet-500 outline-none text-gray-700"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={onUpdate} className="bg-violet-600 text-white text-xs px-3 py-1.5 rounded font-medium hover:bg-violet-700">
                      Save
                    </button>
                    <button onClick={onCancel} className="border border-gray-200 text-gray-500 text-xs px-3 py-1.5 rounded hover:bg-gray-50">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.p key="text-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-700 mt-1 leading-relaxed">
                  {comment.content}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-2 flex items-center gap-1">
              {/* Like Button removed, keeping only Reply */}
              <button
                onClick={() => onReply(comment)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors py-1"
              >
                <MessageCircle size={14} />
                Reply
              </button>
            </div>
          </div>
        </div>

        <CommentMenu
          canEdit={canEdit}
          onEdit={() => onEdit(comment)}
          onDelete={() => onDelete(comment.id)}
        />
      </div>

      <AnimatePresence>
        {replyingTo === comment.id && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="ml-11 mt-3">
            <CommentBox
              publicUser={publicUser}
              commentForm={commentForm}
              handleCommentChange={handleCommentChange}
              handleCommentSubmit={handleCommentSubmit}
              onCancel={onCancelReply} // <-- Pass cancel handler
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>

      {totalRepliesCount > 0 && (
        <div className="ml-11 mt-2">
          <button
            onClick={() => setIsRepliesExpanded(!isRepliesExpanded)}
            className="flex items-center gap-2 text-xs font-bold text-violet-600 hover:text-violet-800 transition-colors py-1"
          >
            {isRepliesExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            <span>
              {totalRepliesCount} {totalRepliesCount === 1 ? "reply" : "replies"}
            </span>
          </button>
        </div>
      )}

      {totalRepliesCount > 0 && isRepliesExpanded && (
        <div className="ml-11 mt-3 border-l-2 border-gray-100 pl-4 space-y-3">
          {comment.replies.slice(0, visibleRepliesCount).map((reply) => (
            <div key={reply.id} className="pt-2">
              <div className="flex gap-2 items-start">
                <CommentAvatar user={reply.publicUser} />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 text-xs">
                      {reply.publicUser.firstName} {reply.publicUser.lastName}
                    </h4>
                    <span className="text-[10px] text-gray-400">
                      {new Date(reply.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-700 leading-relaxed">
                    {reply.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {totalRepliesCount > visibleRepliesCount && (
            <button
              onClick={handleFetchNextReplies}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors pt-1 block"
            >
              — View more replies
            </button>
          )}
        </div>
      )}
    </div>
  );
}