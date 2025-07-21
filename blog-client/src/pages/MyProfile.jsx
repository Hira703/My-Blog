import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import axiosSecure from "../api/axiosSecure";
import {
  FaRegHeart,
  FaBlog,
  FaClock,
  FaArrowRight,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserAlt,
  FaEdit,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [myBlogs, setMyBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [allRes, likedRes, userRes] = await Promise.all([
          axiosSecure.get(`/api/blogs?author=${user.email}`),
          axiosSecure.get("/api/blogs/liked/user"),
          axiosSecure.get(`/api/users?email=${encodeURIComponent(user.email)}`),
        ]);

        setMyBlogs(allRes.data.blogs || []);
        setLikedBlogs(likedRes.data || []);
        setUserInfo(userRes.data || null);
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const renderSkeletonCard = () => (
    <div
      className={`rounded-xl shadow-md overflow-hidden border flex flex-col ${
        theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <Skeleton height={160} />
      <div className="p-4 space-y-2 flex flex-col flex-1 justify-between">
        <Skeleton width={80} height={16} />
        <Skeleton width="80%" />
        <Skeleton count={2} />
        <Skeleton width="100%" height={30} />
      </div>
    </div>
  );

  const BlogCard = ({ blog }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`rounded-xl shadow-md overflow-hidden border flex flex-col transition-all ${
        theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <img src={blog.image} alt={blog.title} className="h-40 w-full object-cover" />
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-white bg-indigo-600 px-2 py-0.5 rounded-full">
              {blog.category}
            </span>
            {blog.isFeatured && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full select-none ${
                  theme === "dark"
                    ? "bg-yellow-800 text-yellow-100"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                ⭐ Featured
              </span>
            )}
          </div>
          <h4
            className={`text-lg font-semibold mb-1 line-clamp-2 ${
              theme === "dark" ? "text-yellow-300" : "text-gray-900"
            }`}
          >
            {blog.title}
          </h4>
          <p
            className={`text-sm mb-2 line-clamp-3 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {blog.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags?.map((tag, idx) => (
              <span
                key={idx}
                className={`text-xs font-semibold px-2 py-0.5 rounded-full cursor-default select-none ${
                  theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`flex items-center justify-between text-sm mb-3 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <FaRegHeart className="text-pink-500" />
            <span>{blog.likes}</span>
          </div>
          <div
            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full select-none ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <FaClock className="text-sm" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <Link
          to={`/blog/${blog._id}`}
          className={`inline-block font-semibold hover:underline ${
            theme === "dark" ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          View Details <FaArrowRight className="inline ml-1" />
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div
      className={`px-4 md:px-8 py-8 max-w-7xl mx-auto ${
        theme === "dark" ? "text-gray-200 bg-gray-900" : "text-gray-800 bg-white"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-6 text-center ${
          theme === "dark" ? "text-yellow-300" : "text-gray-900"
        }`}
      >
        My Profile
      </h2>

      {/* USER INFO */}
      {userInfo && (
        <div
          className={`rounded-xl p-6 mb-10 shadow-md border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <img
              src={userInfo.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2"
            />
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FaUserAlt className="text-indigo-500" />
                {userInfo.name}
              </h3>
              <p className="text-sm flex items-center gap-1">
                <FaEnvelope className="text-pink-400" />
                {userInfo.email}
              </p>

              {/* Static Role */}
              <p className="text-xs mt-1 inline-block px-2 py-0.5 rounded bg-blue-500 text-white select-none">
                Role: Author
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-sm">
              <FaPhoneAlt className="text-green-500" />
              {userInfo.phone || "Not Provided"}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt className="text-red-400" />
              {userInfo.address || "No Address Provided"}
            </p>

            {/* Static Bio */}
            <p
              className={`mt-2 text-sm italic ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Enthusiastic writer passionate about sharing knowledge and stories.
            </p>
          </div>

          {/* Static Tokens and Membership + Update Profile button */}
          <div className="flex flex-col justify-center items-start gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 15l-5.878 3.09L5.52 11.18 1 7.45l6.06-.53L10 1l2.94 5.92 6.06.53-4.52 3.73 1.398 6.91z" />
              </svg>
              Tokens: <span>1200</span>
            </div>
            <div className="text-sm text-gray-400 mb-4">Member since: January 15, 2023</div>

            {/* Update Profile Button */}
            <Link
              to={'/update-profile'}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
            >
              <FaEdit />
              Update Profile
            </Link>
          </div>
        </div>
      )}

      {/* Blogs I Created */}
      <section className="mb-10">
        <h3
          className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
            theme === "dark" ? "text-indigo-300" : "text-indigo-700"
          }`}
        >
          <FaBlog /> Blogs I Created
        </h3>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i}>{renderSkeletonCard()}</div>
              ))}
          </div>
        ) : myBlogs.length === 0 ? (
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            You haven't created any blogs yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>

      {/* Blogs I Liked */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-2xl font-bold flex items-center gap-2 ${
              theme === "dark" ? "text-pink-300" : "text-pink-600"
            }`}
          >
            <FaRegHeart /> Blogs I Liked
          </h3>
          <Link
            to="/wishlist"
            className="flex items-center gap-1 text-sm text-pink-500 hover:underline hover:text-pink-700 font-medium"
          >
            Go to Wishlist <FaArrowRight />
          </Link>
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i}>{renderSkeletonCard()}</div>
              ))}
          </div>
        ) : likedBlogs.length === 0 ? (
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            You haven't liked any blogs yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyProfile;
