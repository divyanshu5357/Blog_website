import { useEffect, useState } from "react";
import { getPosts } from "../services/posts.service";
import { Pencil, Trash2, Eye } from "lucide-react";
import Button from "../components/admin/Button";
import { useNavigate } from "react-router-dom";

import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import Card from "../components/admin/Card";
import Badge from "../components/admin/Badge";
import { deletePost } from "../services/posts.service";


export default function Posts() {
    const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this post?"
  );

  if (!confirmDelete) return;

  try {
    await deletePost(id);

    fetchPosts();
  } catch (error) {
    console.error(error);
  }
};
  if (loading) return <Loader />;

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Posts
          </h1>

          <p className="text-gray-500">
            Manage all blog posts.
          </p>

        </div>

       <Button
  onClick={() => navigate("/admin/posts/new")}
>
  + New Post
</Button>

      </div>

      {posts.length === 0 ? (
        <EmptyState
          title="No Posts"
          description="Create your first blog post."
        />
      ) : (
        <Card>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Title
                </th>

                <th>Status</th>

                <th>Category</th>

                <th>Views</th>

                <th>Author</th>
                
<th className="text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {posts.map((post) => (

                <tr
                  key={post.id}
                  className="border-b"
                >

                  <td className="py-4 font-medium">
                    {post.title}
                  </td>

                  <td>

                    <Badge
                      color={
                        post.status === "PUBLISHED"
                          ? "green"
                          : "yellow"
                      }
                    >
                      {post.status}
                    </Badge>

                  </td>

                  <td>
                    {post.category?.name ?? "-"}
                  </td>

                  <td>
                    {post.views}
                  </td>

                  <td>
                    {post.author.firstName}
                  </td>
                  <td className="text-center">

  <div className="flex justify-center gap-2">

   <Button
  variant="outline"
  className="px-3 py-2"
  onClick={() => navigate(`/blogs/${post.slug}`)}
>
  <Eye size={18} />
</Button>

    <Button
  variant="secondary"
  onClick={() =>
    navigate(`/admin/posts/edit/${post.id}`)
  }
>
      <Pencil size={18} />
    </Button>
    


    <Button
      variant="danger"
      className="px-3 py-2"
      onClick={()=>handleDelete(post.id)}
    >
      <Trash2 size={18} />
    </Button>
    

  </div>

</td>

                </tr>

              ))}

            </tbody>

          </table>

        </Card>
      )}
    </div>
  );
}