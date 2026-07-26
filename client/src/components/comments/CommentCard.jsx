import CommentAvatar from "./CommentAvatar";
import CommentActions from "./CommentActions";
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
  onLike,
  onReply,
}){
  const canEdit =
    publicUser?.id === comment.publicUserId;

  const isEditing =
    editingComment === comment.id;
    

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between">

        <div className="flex gap-4">

          <CommentAvatar user={comment.publicUser} />

          <div>

            <h3 className="font-semibold text-lg">
              {comment.publicUser.firstName}{" "}
              {comment.publicUser.lastName}
            </h3>

            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>

          </div>

        </div>

        <CommentMenu
          canEdit={canEdit}
          onEdit={() => onEdit(comment)}
          onDelete={() => onDelete(comment.id)}
        />

      </div>

      {isEditing ? (
        <div className="mt-5">

          <textarea
            value={editContent}
            onChange={(e) =>
              setEditContent(e.target.value)
            }
            rows={8}
            className="w-full border rounded-xl p-3"
          />

          <div className="flex gap-3 mt-4">

            <button
              onClick={onUpdate}
              className="bg-violet-700 text-white px-5 py-2 rounded-lg"
            >
              Save
            </button>

            <button
  onClick={onCancel}
  className="border px-5 py-2 rounded-lg hover:bg-gray-100"
>
  Cancel
</button>

          </div>

        </div>
      ) : (
        <>
          <p className="mt-5 leading-8 text-gray-700">
            {comment.content}
          </p>

          <CommentActions
            likes={comment.likes || 0}
            onLike={() => onLike(comment.id)}
            onReply={() => onReply(comment)}
          />
          {replyingTo === comment.id && (
  <div className="mt-5 ml-14">
    <CommentBox
      publicUser={publicUser}
      commentForm={commentForm}
      handleCommentChange={handleCommentChange}
      handleCommentSubmit={handleCommentSubmit}
    />
  </div>
)}

{comment.replies?.length > 0 && (
  <div className="ml-14 mt-8 border-l-2 border-violet-100 pl-6 space-y-5">
    {comment.replies.map((reply) => (
      <div
        key={reply.id}
        className="bg-violet-50 rounded-xl p-5"
      >
        <div className="flex gap-3">

          <CommentAvatar
            user={reply.publicUser}
          />

          <div>

            <h4 className="font-semibold">
              {reply.publicUser.firstName}{" "}
              {reply.publicUser.lastName}
            </h4>

            <p className="text-xs text-gray-500">
              {new Date(
                reply.createdAt
              ).toLocaleString()}
            </p>

          </div>

        </div>

        <p className="mt-4 text-gray-700 leading-7">
          {reply.content}
        </p>
      </div>
    ))}
  </div>
)}
       
        </>
      )}
    </div>
  );
}