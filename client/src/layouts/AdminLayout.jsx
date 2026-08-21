import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import { Outlet } from "react-router-dom";
import SEO from "../components/SEO";

export default function AdminLayout() {
  return (
    <div className="admin-layout flex h-screen w-full bg-gray-100 overflow-hidden">
      <SEO title="Admin Console" noindex={true} />
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">

          <Outlet />
          
        </main>

      </div>

    </div>
  );
}