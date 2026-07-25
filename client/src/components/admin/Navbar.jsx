import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { globalSearch } from "../../services/search.service";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : {};

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        fetchSearch();
      } else {
        setResults(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchSearch = async () => {
    try {
      const res = await globalSearch(query);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-white shadow px-8 h-20 flex items-center justify-between">

      {/* Search */}
      <div className="relative">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search posts, users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-lg pl-10 pr-4 py-2 w-80"
        />

        {results && (
          <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg w-96 max-h-96 overflow-y-auto z-50">

            {/* Posts */}
            {results.posts.length > 0 && (
              <>
                <div className="px-4 py-2 font-semibold bg-gray-100">
                  Posts
                </div>

                {results.posts.map((post) => (
                  <div
                    key={post.id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    {post.title}
                  </div>
                ))}
              </>
            )}

            {/* Categories */}
            {results.categories.length > 0 && (
              <>
                <div className="px-4 py-2 font-semibold bg-gray-100">
                  Categories
                </div>

                {results.categories.map((category) => (
                  <div
                    key={category.id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    {category.name}
                  </div>
                ))}
              </>
            )}

            {/* Users */}
            {results.users.length > 0 && (
              <>
                <div className="px-4 py-2 font-semibold bg-gray-100">
                  Users
                </div>

                {results.users.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    {item.firstName} {item.lastName}
                  </div>
                ))}
              </>
            )}

            {results.posts.length === 0 &&
              results.categories.length === 0 &&
              results.users.length === 0 && (
                <div className="p-4 text-gray-500">
                  No results found.
                </div>
              )}

          </div>
        )}

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-violet-600 text-white flex items-center justify-center font-semibold">

            {user.firstName
              ? user.firstName.charAt(0).toUpperCase()
              : "U"}

          </div>

          {/* User Details */}
          <div>

            <h3 className="font-semibold">
              {user.firstName || "Guest"} {user.lastName || ""}
            </h3>

            <p className="text-sm text-gray-500">
              {user.role
                ? user.role
                    .replaceAll("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                : ""}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}