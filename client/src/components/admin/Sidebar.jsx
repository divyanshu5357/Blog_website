import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Users,
  MessageSquare,
  LogOut,
  CalendarDays,
  Mail,
  Settings as SettingsIcon,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Live Sessions",
    icon: CalendarDays,
    path: "/admin/live-sessions",
  },
  {
    title: "Subscribers",
    icon: Mail,
    path: "/admin/subscribers",
  },
  {
    title: "Posts",
    icon: FileText,
    path: "/admin/posts",
  },
  {
    title: "Categories",
    icon: Folder,
    path: "/admin/categories",
  },
  {
    title: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Comments",
    icon: MessageSquare,
    path: "/admin/comments",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    path: "/admin/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove only CMS admin auth — never touch publicToken or publicUser
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col h-full">

      <div className="text-3xl font-bold p-6 border-b border-slate-700 flex-shrink-0">
        AARAMBH
      </div>

      <nav className="flex-1 mt-6 overflow-y-auto">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition ${
                  isActive
                    ? "bg-violet-700"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.title}
            </NavLink>
          );
        })}

      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 p-6 border-t border-slate-700 hover:bg-red-600 transition flex-shrink-0 w-full text-left cursor-pointer"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}