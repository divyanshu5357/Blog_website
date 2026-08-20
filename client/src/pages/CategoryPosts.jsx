import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCategoryPosts } from "../services/category.service";

export default function CategoryPosts() {

  const { slug } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);


  useEffect(() => {
    loadPosts();
  }, [slug]);

  const loadPosts = async () => {
    try {
      const res = await getCategoryPosts(slug);
      setCategory(res.data.category);
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-5">
      <h1 className="text-4xl font-bold mb-10 capitalize">
        {slug.replaceAll("-", " ")}
      </h1>
      {category?.children?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Explore Topics
          </h2>

          <div className="flex flex-wrap gap-3">
            {category.children.map((child) => (
              <button
                key={child.id}
                onClick={() =>
                  navigate(`/category/${child.slug}`)
                }
                className="px-4 py-2 rounded-full bg-violet-100 hover:bg-violet-200 transition"
              >
                {child.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blogs/${post.slug}`}
            className="flex gap-5 border rounded-2xl p-4 hover:shadow-lg transition bg-white"
          >
            <img
              src={
                post.coverImage ||
                "https://placehold.co/180x120?text=No+Image"
              }
              alt={post.title}
              className="w-44 h-28 rounded-xl object-cover flex-0"
            />

            <div className="flex flex-col justify-between flex-1">
              <div>
                <p className="text-sm text-violet-600 font-medium">
                  {post.category.name}
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {post.title}
                </h2>

                <p className="text-gray-600 mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500 text-sm">
                  {post.author.firstName} {post.author.lastName}
                </span>

                <span className="text-violet-600 font-semibold">
                  Read →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}