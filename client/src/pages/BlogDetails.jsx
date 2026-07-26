import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug, likeBlog } from "../services/public.service";
import { Heart, Eye, Clock, User } from "lucide-react";
import { createComment, getComments, updateComment, deleteComment, } from "../services/comment.service";
import { usePublicUser } from "../context/PublicUserContext";
import CommentBox from "../components/comments/CommentBox";
import CommentList from "../components/comments/CommentList";
import { motion, useScroll } from "framer-motion";


const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function BlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [language, setLanguage] = useState("en");
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const { publicUser } = usePublicUser();
  const [replyingTo, setReplyingTo] = useState(null);

  const { scrollYProgress } = useScroll();

  const [commentForm, setCommentForm] = useState({ content: "" });

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
      setPost((prev) => ({ ...prev, likes: res.data.likes }));
      setLiked(true);
      localStorage.setItem(`liked-${slug}`, "true");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentChange = (e) => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!publicUser) {
      window.location.href = "http://localhost:8000/api/public-auth/google";
      return;
    }
    try {
      await createComment({
  postId: post.id,
  content: commentForm.content,
  parentId: replyingTo,
});
setReplyingTo(null);
      setCommentForm({ content: "" });
      loadBlog();
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };
  const handleReply = (comment) => {
  setReplyingTo(comment.id);
};
const handleUpdate = async () => {
  try {
    const res = await updateComment(
      editingComment,
      editContent
    );

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === editingComment
          ? res.data
          : comment
      )
    );

    setEditingComment(null);
    setEditContent("");

  } catch (err) {
    console.log(err);
  }
};
   const handleDelete = async (id) => {
  if (!window.confirm("Delete this comment?")) {
    return;
  }

  try {
    await deleteComment(id);

    setComments((prev) =>
      prev.filter(
        (comment) => comment.id !== id
      )
    );

  } catch (err) {
    console.log(err);
  }
};
const handleCancelEdit = () => {
  setEditingComment(null);
  setEditContent("");
};

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-5 animate-pulse">
        <div className="w-full h-100 bg-gray-200 rounded-2xl mb-10"></div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-6"></div>
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-10"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-violet-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        className="max-w-5xl mx-auto py-12 px-5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {/* Cover Image */}
        {post.coverImage && (
          <motion.img
            variants={fadeUpVariant}
            src={post.coverImage}
            alt={post.title}
            className="w-full h-112.5 object-cover rounded-3xl mb-10 shadow-lg"
          />
        )}

        {/* Category & Language Selector row */}
        <motion.div variants={fadeUpVariant} className="flex justify-between items-center mb-6">
          <span className="bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
            {post.category?.name || "Article"}
          </span>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all cursor-pointer hover:bg-gray-100"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            <option value="gu">ગુજરાતી (Gujarati)</option>

            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {post.title}
        </motion.h1>

        {/* Metadata Bar */}
        <motion.div variants={fadeUpVariant} className="mt-8 flex flex-wrap items-center gap-6 text-gray-500 border-y border-gray-100 py-4">
          <div className="flex items-center gap-2 font-medium text-gray-700">
            <User size={18} className="text-violet-500" />
            <span>{post.author.firstName} {post.author.lastName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{post.readingTime} min read</span>
          </div>

          <div className="flex items-center gap-2">
            <Eye size={18} />
            <span>{post.views}</span>
          </div>

          {/* Interactive Like Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            disabled={liked}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${liked ? "bg-red-50 text-red-500 cursor-default" : "hover:bg-gray-100 text-gray-500"
              }`}
          >
            <motion.div
              animate={liked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} className={liked ? "text-red-500" : ""} />
            </motion.div>
            <span className="font-medium">{post.likes}</span>
          </motion.button>
        </motion.div>

        {/* Excerpt */}
        <motion.p variants={fadeUpVariant} className="mt-8 text-xl text-gray-600 font-serif italic border-l-4 border-violet-500 pl-6">
          {post.excerpt}
        </motion.p>

        {/* Article Content */}
        <motion.article
          variants={fadeUpVariant}
          className="prose prose-lg md:prose-xl prose-violet max-w-none mt-12 mb-20 text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comments Section */}
        <motion.div variants={fadeUpVariant} className="mt-16 bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Discussion ({comments.length})
          </h2>

          <CommentBox
            publicUser={publicUser}
            commentForm={commentForm}
            handleCommentChange={handleCommentChange}
            handleCommentSubmit={handleCommentSubmit}
          />

          <div className="mt-10">
           <CommentList
  comments={comments}
  publicUser={publicUser}

  editingComment={editingComment}
  editContent={editContent}
  setEditContent={setEditContent}

  replyingTo={replyingTo}
  commentForm={commentForm}
  handleCommentChange={handleCommentChange}
  handleCommentSubmit={handleCommentSubmit}

  onUpdate={handleUpdate}
  onCancel={handleCancelEdit}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onReply={handleReply}
/>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}