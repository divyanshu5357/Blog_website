import { LogOut, X } from "lucide-react";
import EmojiPickerButton from "./EmojiPickerButton";
import { API_BASE_URL } from "../../config/api";

export default function CommentBox({
  publicUser,
  commentForm,
  setCommentForm,
  handleCommentChange,
  handleCommentSubmit,
  autoFocus = false,
  onCancel,
}) {
  const signOut = () => {
    localStorage.removeItem("publicToken");
    localStorage.removeItem("publicUser");
    window.location.reload();
  };

  const handleGoogleLogin = () => {
    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    if (currentPath && currentPath.startsWith("/") && !currentPath.startsWith("//")) {
      localStorage.setItem("redirectAfterLogin", currentPath);
    }
    const targetUrl = `${API_BASE_URL}/public-auth/google?redirect=${encodeURIComponent(currentPath)}`;
    window.location.href = targetUrl;
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
              onClick={handleGoogleLogin}
              type="button"
              className="flex items-center gap-3 border border-gray-300 rounded-lg px-5 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
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
            
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer"
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
                src={publicUser.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(publicUser.firstName || "User")}
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
                type="button"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
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
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none resize-y min-h-[80px] text-gray-700"
              required
            />

            <div className="flex justify-between items-center mt-3">
              <EmojiPickerButton setCommentForm={setCommentForm} />

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-medium">
                  {commentForm.content.length}/1000
                </span>

                <button
                  type="submit"
                  className="bg-[#4A2B4D] hover:bg-[#361f38] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}