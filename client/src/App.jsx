import { Routes, Route } from "react-router-dom";
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

export default function App() {
   useLenis();
  return (
    <Routes>
      
      <Route path="/" element={<HomePage />} />
      <Route
  path="/category/:slug"
  element={<CategoryPosts />}
/>
      <Route
  path="/blogs/:slug"
  element={<BlogDetails />}
/>

      <Route path="/admin/login" element={<Login />} />

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
<Route
  path="/google-success"
  element={<GoogleSuccess />}
/>


    </Routes>
  );
}