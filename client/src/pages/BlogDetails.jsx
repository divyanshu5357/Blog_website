import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug, likeBlog } from "../services/public.service";
import { Heart, Eye } from "lucide-react";
import {createComment,getComments,} from "../services/comment.service";

export default function BlogDetails() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [language, setLanguage] = useState("en");
  const [comments, setComments] = useState([]);

const [commentForm, setCommentForm] = useState({name: "",email: "",content: "",});

  useEffect(() => {
    loadBlog();
  }, [slug, language]);

  useEffect(() => {
    const isLiked = localStorage.getItem(`liked-${slug}`);
    setLiked(!!isLiked);
  }, [slug]);

  const loadBlog = async () => {
    try {
      const res = await getBlogBySlug(slug, language);
      setPost(res.data);
      const commentRes = await getComments(slug);
      setComments(commentRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (liked) return;

    try {
      const res = await likeBlog(slug);

      setPost((prev) => ({
        ...prev,
        likes: res.data.likes,
      }));

      setLiked(true);
      localStorage.setItem(`liked-${slug}`, "true");
    } catch (err) {
      console.log(err);
    }
  };

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        Loading...
      </div>
    );
  }
const handleCommentChange = (e) => {
  setCommentForm({
    ...commentForm,
    [e.target.name]: e.target.value,
  });
};
const handleCommentSubmit = async (e) => {
  e.preventDefault();

  try {
    await createComment({
      ...commentForm,
      postId: post.id,
    });

    alert(
      "Comment submitted. It will appear after approval."
    );

    setCommentForm({
      name: "",
      email: "",
      content: "",
    });
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="max-w-5xl mx-auto py-12 px-5">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-105 object-cover rounded-2xl mb-10"
        />
      )}

      <p className="text-violet-600 font-semibold">
        {post.category?.name}
      </p>

      <div className="mb-6">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-4"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="ml">മലയാളം (Malayalam)</option>
          <option value="bn">বাংলা (Bengali)</option>
        </select>
      </div>

      <h1 className="text-5xl font-bold mt-3">
        {post.title}
      </h1>

      {/* Corrected Metadata Section */}
      <div className="mt-4 flex items-center gap-6 text-gray-500">
        <span>
          {post.author.firstName} {post.author.lastName}
        </span>

        <span>
          {post.readingTime} min read
        </span>

        <div className="flex items-center gap-2">
          <Eye size={18} />
          <span>{post.views}</span>
        </div>

        <button
          onClick={handleLike}
          disabled={liked}
          className={`flex items-center gap-2 transition-colors ${
            liked ? "text-red-500" : "hover:text-red-500"
          }`}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
          <span>{post.likes}</span>
        </button>
      </div>

      <p className="mt-8 text-xl text-gray-600">
        {post.excerpt}
      </p>

      <article
        className="prose prose-lg max-w-none mt-10"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
      <div className="mt-16 border-t pt-10">

  <h2 className="text-3xl font-bold mb-8">
    Comments ({comments.length})
  </h2>

  {/* Comment Form */}

  <form
    onSubmit={handleCommentSubmit}
    className="space-y-4 bg-gray-50 rounded-xl p-6"
  >

    <input
      type="text"
      name="name"
      placeholder="Your Name"
      value={commentForm.name}
      onChange={handleCommentChange}
      className="w-full border rounded-lg p-3"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Email (Optional)"
      value={commentForm.email}
      onChange={handleCommentChange}
      className="w-full border rounded-lg p-3"
    />

    <textarea
      name="content"
      rows={5}
      placeholder="Write your comment..."
      value={commentForm.content}
      onChange={handleCommentChange}
      className="w-full border rounded-lg p-3"
      required
    />

    <button
      type="submit"
      className="bg-violet-700 text-white px-6 py-3 rounded-lg hover:bg-violet-800"
    >
      Submit Comment
    </button>

  </form>

  {/* Approved Comments */}

  <div className="mt-10 space-y-6">

    {comments.length === 0 ? (

      <p className="text-gray-500">
        No comments yet.
      </p>

    ) : (

      comments.map((comment) => (

        <div
          key={comment.id}
          className="border rounded-xl p-5"
        >

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

              {comment.name.charAt(0).toUpperCase()}

            </div>

            <div>

              <h4 className="font-semibold">

                {comment.name}

              </h4>

              <p className="text-sm text-gray-500">

                {new Date(
                  comment.createdAt
                ).toLocaleDateString()}

              </p>

            </div>

          </div>

          <p className="mt-4 text-gray-700">

            {comment.content}

          </p>

        </div>

      ))

    )}

  </div>

</div>
    </div>
  );
}