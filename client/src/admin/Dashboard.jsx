import { useEffect, useState } from "react";
import {
  FileText,
  Folder,
  Users,
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
      title: "Drafts",
      value: dashboard.stats.draftPosts,
      icon: FileText,
      color: "bg-orange-500",
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

      <div className="grid grid-cols-4 gap-6">

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

    </div>
  );
}