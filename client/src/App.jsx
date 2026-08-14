import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ManageBlogs from "./admin/ManageBlogs";
import Categories from "./admin/Categories";
import Comments from "./admin/Comments";
import Users from "./admin/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/blogs" element={<ManageBlogs />} />
      <Route path="/admin/categories" element={<Categories />} />
      <Route path="/admin/comments" element={<Comments />} />
      <Route path="/admin/users" element={<Users />} />
    </Routes>
  );
}

export default App;