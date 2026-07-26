import CommentCard from "./CommentCard";

export default function CommentList({
  comments,
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
  onLike,
  onReply,
}) {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 text-lg">
        No comments yet. Be the first to comment.
      </p>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      {comments.map((comment) => (
      <CommentCard
  key={comment.id}
  comment={comment}
  publicUser={publicUser}

  editingComment={editingComment}
  editContent={editContent}
  setEditContent={setEditContent}

  onUpdate={onUpdate}
  onCancel={onCancel}   // ← ADD THIS

  onEdit={onEdit}
  onDelete={onDelete}
  onLike={onLike}
  onReply={onReply}
replyingTo={replyingTo}
commentForm={commentForm}
handleCommentChange={handleCommentChange}
handleCommentSubmit={handleCommentSubmit}
/>
      ))}
    </div>
  );
}