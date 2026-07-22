import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedPosts }  from "../services/public.service";

function Articles() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await getFeaturedPosts();
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="section tinted">
      <div className="section-heading">
        <p className="section-kicker">
          Latest Articles
        </p>

        <h2>
          Featured Blogs
        </h2>
      </div>

      <div className="article-grid">
        {posts.map((post) => (
          <article
            className="article-card"
            key={post.id}
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
            )}

            <span>
              {post.category?.name}
            </span>

            <h3>
              {post.title}
            </h3>

            <p>
              {post.excerpt}
            </p>

            <small>
              By {post.author.firstName} {post.author.lastName}
            </small>

            <Link
              to={`/blogs/${post.slug}`}
              className="flex items-center gap-2 mt-4"
            >
              Read Article
              <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Articles;