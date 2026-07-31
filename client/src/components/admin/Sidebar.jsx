import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Users,
  MessageSquare,
  LogOut,
  CalendarDays,
  Mail,
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
 
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="text-3xl font-bold p-6 border-b border-slate-700">
        AARAMBH
      </div>

      <nav className="flex-1 mt-6">

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
        className="flex items-center gap-3 p-6 border-t border-slate-700 hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}