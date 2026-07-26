import { LogOut, X } from "lucide-react"; // <-- Import X
import EmojiPickerButton from "./EmojiPickerButton";
export default function CommentBox({
  publicUser,
  commentForm,
  setCommentForm,
  handleCommentChange,
  handleCommentSubmit,
  autoFocus = false,
  onCancel, // <-- Receives the cancel function
}) {
  const signOut = () => {
    localStorage.removeItem("publicToken");
    window.location.reload();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 w-full relative">
      {!publicUser ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Join the Discussion
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to share your thoughts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                (window.location.href =
                  "http://localhost:8000/api/public-auth/google")
              }
              className="flex items-center gap-3 border border-gray-300 rounded-lg px-5 py-2.5 hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                className="w-5 h-5"
                alt="Google logo"
              />
              <span className="text-sm font-semibold text-gray-700">
                Sign in with Google
              </span>
            </button>
            
            {/* CROSS BUTTON FOR GUEST */}
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={publicUser.avatar}
                alt=""
                className="w-10 h-10 rounded-full border border-gray-100"
              />
              <div>
                <h3 className="font-semibold text-sm text-gray-900">
                  {publicUser.firstName} {publicUser.lastName}
                </h3>
                <p className="text-xs text-gray-500">{publicUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>

              {/* CROSS BUTTON FOR LOGGED IN USER */}
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Cancel Reply"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              rows={3}
              name="content"
              value={commentForm.content}
              onChange={handleCommentChange}
              placeholder="Share your thoughts..."
              autoFocus={autoFocus}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none resize-y min-h-[80px] text-gray-700"
              required
            />

              <div className="flex justify-between items-center mt-3">

  <EmojiPickerButton
    setCommentForm={setCommentForm}
  />

  <span className="text-gray-500">
    {commentForm.content.length}/1000
  </span>

</div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-400 font-medium">
                {commentForm.content.length}/1000
              </p>

              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}