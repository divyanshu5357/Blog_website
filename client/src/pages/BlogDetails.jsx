import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug, likeBlog, getRelatedPosts } from "../services/public.service";
import RelatedPosts from "../components/blog/RelatedPosts";
import { Heart, Eye, Clock, User, ArrowLeft } from "lucide-react";
import DeleteModal from "../components/DeleteModal";
import ShareButtons from "../components/blog/ShareButtons";

import {
  createComment,
  getComments,
  updateComment,
  deleteComment
} from "../services/comment.service";
import { usePublicUser } from "../context/PublicUserContext";
import CommentBox from "../components/comments/CommentBox";
import CommentList from "../components/comments/CommentList";
import { motion, useScroll } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function BlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [language, setLanguage] = useState("en");
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const { publicUser } = usePublicUser();
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);

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
      const relatedRes = await getRelatedPosts(slug);
      setRelatedPosts(relatedRes.data);
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

  const handleCancelReply = () => {
    setReplyingTo(null);
    setCommentForm({ content: "" });
  };

  const handleUpdate = async () => {
    try {
      const res = await updateComment(editingComment, editContent);
      setComments((prev) =>
        prev.map((comment) => (comment.id === editingComment ? res.data : comment))
      );
      setEditingComment(null);
      setEditContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const requestDelete = (id) => {
    setCommentToDelete(id);
  };

  const confirmDelete = async () => {
    if (!commentToDelete) return;

    try {
      await deleteComment(commentToDelete);
      setComments((prev) => prev.filter((comment) => comment.id !== commentToDelete));
      setCommentToDelete(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-violet-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-4xl mx-auto py-10 md:py-16 px-5">

        {post ? (
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 mb-8 text-sm font-semibold text-gray-500"
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 -ml-3 rounded-xl hover:text-violet-700 hover:bg-violet-50 transition-all duration-200"
            >
              <ArrowLeft size={16} />
              Home
            </Link>

            {post.category && (
              <>
                <span className="text-gray-300">/</span>
                <Link
                  to={`/category/${post.category.slug}`}
                  className="px-3 py-1.5 rounded-xl hover:text-violet-700 hover:bg-violet-50 transition-all duration-200"
                >
                  {post.category.name}
                </Link>
              </>
            )}
          </motion.div>
        ) : (
          <div className="flex items-center gap-3 mb-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
            <div className="text-gray-200">/</div>
            <div className="h-6 bg-gray-200 rounded-lg w-24"></div>
          </div>
        )}

        {/* Isolated Blog Content Loader */}
        {!post ? (
          <div className="animate-pulse mb-16">
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-3xl mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-full md:w-3/4 mb-6"></div>
            <div className="space-y-4 mt-8">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {post.coverImage && (
              <motion.img
                variants={fadeUpVariant}
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-[450px] object-cover rounded-3xl mb-8 shadow-sm"
              />
            )}

            <motion.div variants={fadeUpVariant} className="flex justify-between items-center mb-6">
              <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {post.category?.name || "Article"}
              </span>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-gray-200 text-sm text-gray-700 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer hover:bg-gray-50"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </motion.div>

            <motion.h1 variants={fadeUpVariant} className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {post.title}
            </motion.h1>

            <motion.div variants={fadeUpVariant} className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-500 border-y border-gray-100 py-4">
              <div className="flex items-center gap-1.5 font-medium text-gray-700">
                <User size={16} className="text-violet-500" />
                <span>{post.author.firstName} {post.author.lastName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={16} />
                <span>{post.views}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                disabled={liked}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ml-auto md:ml-0 ${liked ? "bg-red-50 text-red-500 cursor-default" : "hover:bg-gray-50 text-gray-500"
                  }`}
              >
                <motion.div animate={liked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                  <Heart size={16} fill={liked ? "currentColor" : "none"} className={liked ? "text-red-500" : ""} />
                </motion.div>
                <span className="font-semibold">{post.likes}</span>
              </motion.button>
            </motion.div>

            <motion.p variants={fadeUpVariant} className="mt-8 text-lg text-gray-600 font-serif italic border-l-4 border-violet-400 pl-5">
              {post.excerpt}
            </motion.p>

            <motion.article
              variants={fadeUpVariant}
              className="prose prose-lg prose-violet max-w-none mt-10 mb-16 text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <ShareButtons title={post.title} />
          </motion.div>
        )}

        {/* RELATED POSTS SECTION */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}

        {/* Comment section stays interactive, avoiding full-page loading locks */}
        <div className="mt-12 border-t border-gray-200 pt-10">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Discussion</h2>
            <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-2.5 py-0.5 rounded-full">
              {comments.length}
            </span>
          </div>

          <CommentBox
            publicUser={publicUser}
            commentForm={commentForm}
            handleCommentChange={handleCommentChange}
            handleCommentSubmit={handleCommentSubmit}
            setCommentForm={setCommentForm}
          />

          <div className="mt-8">
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
              onDelete={requestDelete}
              onReply={handleReply}
              onCancelReply={handleCancelReply}
            />

            <DeleteModal
              isOpen={commentToDelete !== null}
              onClose={() => setCommentToDelete(null)}
              onConfirm={confirmDelete}
            />
          </div>

        </div>

      </div>
    </>
  );
}