import { useEffect, useState } from "react";
import {
  FileText,
  Folder,
  Users,
  Eye,
  Heart,
  MessageCircle,
  FileCheck,
  Mail,
} from "lucide-react";

import { getDashboard } from "../services/dashboard.service";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
  {
    title: "Posts",
    value: dashboard.stats.totalPosts,
    icon: FileText,
    color: "bg-violet-600",
  },
  {
    title: "Published",
    value: dashboard.stats.publishedPosts,
    icon: FileCheck,
    color: "bg-emerald-600",
  },
  {
    title: "Drafts",
    value: dashboard.stats.draftPosts,
    icon: FileText,
    color: "bg-orange-500",
  },
  {
    title: "Categories",
    value: dashboard.stats.totalCategories,
    icon: Folder,
    color: "bg-blue-600",
  },
  {
    title: "Users",
    value: dashboard.stats.totalUsers,
    icon: Users,
    color: "bg-green-600",
  },
  {
    title: "Subscribers",
    value: dashboard.stats.totalSubscribers || 0,
    icon: Mail,
    color: "bg-indigo-600",
  },
  {
    title: "Comments",
    value: dashboard.stats.totalComments,
    icon: MessageCircle,
    color: "bg-pink-600",
  },
  {
    title: "Views",
    value: dashboard.stats.totalViews,
    icon: Eye,
    color: "bg-cyan-600",
  },
  {
    title: "Likes",
    value: dashboard.stats.totalLikes,
    icon: Heart,
    color: "bg-red-600",
  },
];
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back 👋
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" >

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
              >
                <Icon size={28} />
              </div>
            </div>
          );
        })}

      </div>

      <div className="bg-white rounded-xl shadow">

        <div className="p-6 border-b">

          <h2 className="text-xl font-semibold">
            Recent Posts
          </h2>

        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-4">
                Title
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Views
              </th>

            </tr>

          </thead>

          <tbody>

            {dashboard.recentPosts.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-8 text-gray-500"
                >
                  No posts found.
                </td>
              </tr>
            ) : (
              dashboard.recentPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {post.title}
                  </td>

                  <td>
                    {post.status}
                  </td>

                  <td>
                    {post.views}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>
      <div className="bg-white rounded-xl shadow mt-8">

  <div className="p-6 border-b">
    <h2 className="text-xl font-semibold">
      Recent Comments
    </h2>
  </div>

  <div className="divide-y">

    {dashboard.recentComments.length === 0 ? (

      <p className="p-6 text-gray-500">
        No comments yet.
      </p>

    ) : (

      dashboard.recentComments.map((comment) => (

        <div
          key={comment.id}
          className="p-6"
        >

          <div className="flex justify-between">

            <strong>
              {comment.name}
            </strong>

            <span className="text-gray-400 text-sm">
              {new Date(
                comment.createdAt
              ).toLocaleDateString()}
            </span>

          </div>

          <p className="text-gray-500 text-sm mt-1">
            {comment.post.title}
          </p>

          <p className="mt-3">
            {comment.content}
          </p>

        </div>

      ))

    )}

  </div>

</div>
<div className="bg-white rounded-xl shadow mt-8">

  <div className="p-6 border-b">
    <h2 className="text-xl font-semibold">
      Popular Posts
    </h2>
  </div>

  <table className="w-full">

    <thead>

      <tr className="border-b">

        <th className="text-left p-4">
          Title
        </th>

        <th>Views</th>

        <th>Likes</th>

      </tr>

    </thead>

    <tbody>

      {dashboard.popularPosts.map((post) => (

        <tr
          key={post.id}
          className="border-b"
        >

          <td className="p-4">
            {post.title}
          </td>

          <td>{post.views}</td>

          <td>{post.likes}</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

    </div>
  );
}