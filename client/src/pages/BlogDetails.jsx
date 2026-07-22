import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug } from "../services/public.service";

export default function BlogDetails() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    loadBlog();
  }, [slug]);

  const loadBlog = async () => {
    try {
      const res = await getBlogBySlug(slug);

      setPost(res.data);
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

  return (
    <div className="max-w-5xl mx-auto py-12 px-5">

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-[420px] object-cover rounded-2xl mb-10"
        />
      )}

      <p className="text-violet-600 font-semibold">
        {post.category?.name}
      </p>

      <h1 className="text-5xl font-bold mt-3">
        {post.title}
      </h1>

      <div className="mt-4 text-gray-500 flex gap-4">

        <span>
          {post.author.firstName} {post.author.lastName}
        </span>

        <span>
          {post.readingTime} min read
        </span>

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

    </div>
  );
}