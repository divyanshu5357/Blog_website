import { useEffect, useState } from "react";

import Card from "../components/admin/Card";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import Button from "../components/admin/Button";

import {
  getAdminComments,
  deleteComment,
} from "../services/comment.service";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const res = await getAdminComments();

      setComments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?"))
      return;

    try {
      await deleteComment(id);

      loadComments();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Comments
        </h1>

        <p className="text-gray-500">
          Manage blog comments
        </p>
      </div>

      {comments.length === 0 ? (
        <EmptyState
          title="No Comments"
          description="No comments available."
        />
      ) : (
        <Card>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Name
                </th>

                <th>Email</th>

                <th>Post</th>

                <th>Comment</th>

                <th>Date</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>
  {comments.map((comment) => (
    <tr
      key={comment.id}
      className="border-b"
    >
      <td className="py-4">
        <div className="flex items-center gap-3">
          <img
            src={comment.publicUser.avatar}
            alt=""
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-semibold">
              {comment.publicUser.firstName}{" "}
              {comment.publicUser.lastName}
            </p>
          </div>
        </div>
      </td>

      <td>
        {comment.publicUser.email}
      </td>

      <td>
        {comment.post.title}
      </td>

      <td className="max-w-sm">
        {comment.content}
      </td>

      <td>
        {new Date(comment.createdAt).toLocaleDateString()}
      </td>

      <td>
        <Button
          variant="danger"
          onClick={() => handleDelete(comment.id)}
        >
          Delete
        </Button>
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