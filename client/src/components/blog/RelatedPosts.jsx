import { Link } from "react-router-dom";

export default function RelatedPosts({ posts }) {
  if (!posts.length) return null;

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold mb-8">
        Related Articles
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blogs/${post.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-52 w-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="p-5">
              <span className="text-xs text-violet-600 font-semibold">
                {post.category?.name}
              </span>

              <h3 className="mt-2 font-bold text-lg line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mt-3">
                {post.readingTime} min read
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}