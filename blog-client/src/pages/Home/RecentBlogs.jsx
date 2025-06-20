import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axiosSecure from "../../api/axiosSecure";
import BlogCard from "../../components/BlogCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeContext } from "../../context/ThemeProvider";

const RecentBlogs = () => {
  const { theme } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosSecure.get("/api/blogs/recent?limit=6");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      className={`py-14 px-4 md:px-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-[#0f172a]" : "bg-gray-50"
      }`}
    >
      <h2
        className={`text-3xl md:text-4xl font-bold text-center mb-10 ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Recent <span className="text-primary">Blogs</span>
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 border-t border-gray-200 dark:border-slate-700 pt-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`card card-compact rounded-xl overflow-hidden p-5 shadow-sm transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <Skeleton
                  height={180}
                  baseColor={theme === "dark" ? "#1e293b" : "#e2e8f0"}
                  highlightColor={theme === "dark" ? "#334155" : "#f0f4f8"}
                />
                <div className="mt-4 space-y-3">
                  <Skeleton
                    height={24}
                    width={`80%`}
                    baseColor={theme === "dark" ? "#1e293b" : "#e2e8f0"}
                    highlightColor={theme === "dark" ? "#334155" : "#f0f4f8"}
                  />
                  <Skeleton
                    count={2}
                    baseColor={theme === "dark" ? "#1e293b" : "#e2e8f0"}
                    highlightColor={theme === "dark" ? "#334155" : "#f0f4f8"}
                  />
                  <Skeleton
                    height={20}
                    width={`40%`}
                    baseColor={theme === "dark" ? "#1e293b" : "#e2e8f0"}
                    highlightColor={theme === "dark" ? "#334155" : "#f0f4f8"}
                  />
                  <Skeleton
                    height={35}
                    width={`100%`}
                    baseColor={theme === "dark" ? "#1e293b" : "#e2e8f0"}
                    highlightColor={theme === "dark" ? "#334155" : "#f0f4f8"}
                  />
                </div>
              </div>
            ))
          : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>

      {/* View All Blogs Button */}
      <div className="mt-10 text-center">
        <Link
          to="/all-blogs"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition duration-300"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default RecentBlogs;
