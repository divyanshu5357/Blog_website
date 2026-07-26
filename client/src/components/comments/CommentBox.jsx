import { LogOut } from "lucide-react";

export default function CommentBox({
  publicUser,
  commentForm,
  handleCommentChange,
  handleCommentSubmit,
}) {
  const signOut = () => {
    localStorage.removeItem("publicToken");
    window.location.reload();
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-8">

      {!publicUser ? (
        <div className="text-center">

          <h2 className="text-3xl font-bold text-violet-800">
            Join the Discussion
          </h2>

          <p className="text-gray-500 mt-3">
            Sign in with Google to share your thoughts.
          </p>

          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:8000/api/public-auth/google")
            }
            className="mt-8 border rounded-xl px-8 py-4 flex items-center gap-4 mx-auto hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              className="w-7"
              alt=""
            />

            <span className="text-xl font-semibold">
              Continue with Google
            </span>
          </button>

        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <img
                src={publicUser.avatar}
                alt=""
                className="w-14 h-14 rounded-full"
              />

              <div>

                <h3 className="font-bold text-lg">
                  {publicUser.firstName} {publicUser.lastName}
                </h3>

                <p className="text-gray-500">
                  {publicUser.email}
                </p>

              </div>

            </div>

            <button
              onClick={signOut}
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <LogOut size={18} />

              Sign Out
            </button>

          </div>

          <form
            onSubmit={handleCommentSubmit}
            className="mt-8"
          >
            <textarea
              rows={6}
              name="content"
              value={commentForm.content}
              onChange={handleCommentChange}
              placeholder="Share your thoughts..."
              className="w-full border rounded-xl p-4 resize-none"
              required
            />

            <div className="flex justify-between items-center mt-4">

              <p className="text-sm text-gray-500">
                {commentForm.content.length}/1000
              </p>

              <button
                type="submit"
                className="bg-violet-700 hover:bg-violet-800 text-white px-8 py-3 rounded-xl"
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