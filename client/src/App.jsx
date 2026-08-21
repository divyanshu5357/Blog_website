import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public pages
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import CategoryPosts from "./pages/CategoryPosts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GoogleSuccess from "./pages/GoogleSuccess";

// Admin Layout & pages
import AdminLayout from "./layouts/AdminLayout";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Posts from "./admin/Posts";
import CreatePost from "./admin/CreatePost";
import EditPost from "./admin/EditPost";
import Categories from "./admin/Categories";
import CreateCategory from "./admin/CreateCategory";
import EditCategory from "./admin/EditCategory";
import Comments from "./admin/Comments";
import Users from "./admin/Users";
import CreateUser from "./admin/CreateUser";
import EditUser from "./admin/EditUser";
import LiveSessionsAdmin from "./admin/LiveSessionsAdmin";
import CreateLiveSession from "./admin/CreateLiveSession";
import Subscribers from "./admin/Subscribers";
import Media from "./admin/Media";
import Settings from "./admin/Settings";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/category/:slug" element={<CategoryPosts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/google-success" element={<GoogleSuccess />} />

        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Protected Routes with AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/new" element={<CreatePost />} />
          <Route path="posts/edit/:id" element={<EditPost />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/new" element={<CreateCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="comments" element={<Comments />} />
          <Route path="users" element={<Users />} />
          <Route path="users/new" element={<CreateUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="live-sessions" element={<LiveSessionsAdmin />} />
          <Route path="sessions" element={<LiveSessionsAdmin />} />
          <Route path="sessions/new" element={<CreateLiveSession />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="media" element={<Media />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;