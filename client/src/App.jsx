import { Routes, Route, Outlet } from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreatePost from "./admin/CreatePost";
import EditPost from "./admin/EditPost";
import toast, { Toaster } from "react-hot-toast";
import Hero from "./components/Hero";
import About from "./components/About";
import Categories from "./components/Categories";
import Articles from "./components/Articles";
import LiveSessions from "./components/LiveSessions";
import MostRead from "./components/MostRead";
import Resources from "./components/Resources";
import Subscribe from "./components/Subscribe";
import Community from "./components/Community";
import GoogleSuccess from "./pages/GoogleSuccess";

import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import CategoriesAdmin from "./admin/Categories";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./admin/Users";
import EditUser from "./admin/EditUser";
import Posts  from "./admin/Posts";

import CategoryPosts from "./pages/CategoryPosts";
import CreateCategory from "./admin/CreateCategory";
import EditCategory from "./admin/EditCategory";
import CreateUser from "./admin/CreateUser";
import Comments from "./admin/Comments";
import useLenis from "./hooks/useLenis";
import LiveSessionsAdmin from "./admin/LiveSessionsAdmin";

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Categories />
        <Articles />
        <LiveSessions />
        <MostRead />
        <Resources />
        <Subscribe />
        <Community />
      </main>
      <Footer />
    </>
  );
}


function PublicLayout() {
  useLenis(); 
  return <Outlet />;
}

export default function App() {


  return (
    <Routes>
      

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPosts />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
      </Route>


      <Route path="/admin/login" element={<Login />} />
      <Route path="/google-success" element={<GoogleSuccess />} />


      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/live-sessions"
          element={
            <ProtectedRoute>
              <LiveSessionsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <CategoriesAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/new"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/comments"
          element={
            <ProtectedRoute>
              <Comments />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* NOTE: These routes were floating outside your AdminLayout before. 
          If they have sidebars, they should ideally be inside the <AdminLayout> block above. 
          I left them exactly as you had them, but they won't have the sidebar if they stay here. */}
      <Route
        path="/admin/categories/new"
        element={
          <ProtectedRoute>
            <CreateCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories/edit/:id"
        element={
          <ProtectedRoute>
            <EditCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/edit/:id"
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/new"
        element={
          <ProtectedRoute>
            <CreateUser />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}