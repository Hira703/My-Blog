import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Allblogs from "../pages/Allblogs";
import BlogDetails from "../pages/BlogDetails";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import PrivateRoute from "./PrivateRoute";
import Wishlist from '../pages/Wishlist';
import AddBlog from "../pages/AddBlog";
import UpdateBlog from "../pages/UpdateBlog";
import MyProfile from "../pages/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ changed
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />, // ✅ changed
      },
      {
        path: "/login",
        element: <Login />, // ✅ changed
      },
      {
        path: "/register",
        element: <Register />, // ✅ changed
      },
      {
        path: "/all-blogs",
        element: <Allblogs />, // ✅ changed
      },
      {
        path: "/featured-blogs",
        element: <FeaturedBlogs />, // ✅ changed
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoute>
           <BlogDetails />
          </PrivateRoute>
        ),
    
      },
      {
        path: "/my-profile",
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>, // ✅ changed (you might want a different component)
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-blogs",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-blog/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
