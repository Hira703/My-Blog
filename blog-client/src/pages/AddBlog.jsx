import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";  // Import your ThemeContext
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosSecure from "../api/axiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CATEGORIES = [
  "Tech",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
  "Health",
  "Education",
  "Finance",
  "Career",
  "Entertainment",
  "Science",
  "DIY & Crafts",
  "News & Politics",
  "Environment",
  "Opinion",
];

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Get theme from context
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const wrapWithP = (text) => {
    const trimmed = text.trim();
    return trimmed.startsWith("<p>") ? trimmed : `<p>${trimmed}</p>`;
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value.trim();
    const image = form.image.value.trim() || "https://i.ibb.co/5WhpW6Wv/user-profile.png";
    const shortDescription = form.shortDescription.value.trim();
    const longDescription = wrapWithP(form.longDescription.value);
    const tags = form.tags.value
      ? form.tags.value.split(",").map((tag) => tag.trim())
      : [];
    const readTime = `${form.readTime.value} min`;
    const isFeatured = form.featured.checked;
    const isPublished = form.isPublished.checked;

    if (!selectedCategory) {
      Swal.fire({
        icon: "warning",
        title: "Select Category",
        text: "Please select one category for your blog.",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    const newBlog = {
      title,
      slug: title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
      image,
      category: selectedCategory,
      shortDescription,
      longDescription,
      tags,
      readTime,
      isFeatured,
      isPublished,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
        photo: user?.photoURL || "https://i.ibb.co/5WhpW6Wv/user-profile.png",
      },
      likes: 0,
      comments: [],
    };

    try {
      setLoading(true);
      const res = await axiosSecure.post("/api/blogs", newBlog);

      if (res.data?.blogId) {
        Swal.fire({
          icon: "success",
          title: "Blog added!",
          text: "Your blog was added successfully.",
          confirmButtonColor: "#6366f1",
        }).then(() => navigate("/all-blogs"));
      } else {
        throw new Error("Insert failed");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while adding the blog.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div
          className={`p-10 rounded-xl shadow-xl transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Please log in to add a blog</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-3xl mx-auto mt-10 p-8 rounded-lg shadow-md transition-colors duration-300
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900 border border-gray-200"}`}
    >
      <h2 className="text-3xl font-bold text-center mb-6">Add a New Blog</h2>
      <form onSubmit={handleAddBlog} className="space-y-4">
        {loading ? (
          <>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={30} />
          </>
        ) : (
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className={`input input-bordered w-full transition-colors duration-300
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                }`}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className={`input input-bordered w-full transition-colors duration-300
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                }`}
              required
            />

            <div className="form-control">
              <label
                htmlFor="category"
                className={`label font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className={`select select-bordered w-full transition-colors duration-300
                  ${
                    theme === "dark"
                      ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
                      : "bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                  }`}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="shortDescription"
              placeholder="Short Description"
              className={`textarea textarea-bordered w-full transition-colors duration-300
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                }`}
              required
            />
            <textarea
              name="longDescription"
              placeholder="Long Description"
              className={`textarea textarea-bordered w-full transition-colors duration-300
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                }`}
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              className={`input input-bordered w-full transition-colors duration-300
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                }`}
            />
            <input
              type="number"
              name="readTime"
              placeholder="Read Time (in mins)"
              className={`input input-bordered w-full transition-colors duration-300
                ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                }`}
              min="1"
              required
            />

            <label
              className={`label cursor-pointer justify-start gap-2 transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              <input
                type="checkbox"
                name="featured"
                className="checkbox checkbox-info"
              />
              <span>Mark as Featured</span>
            </label>

            <label
              className={`flex items-center space-x-2 cursor-pointer transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              <input
                type="checkbox"
                name="isPublished"
                className="checkbox checkbox-accent"
              />
              <span>Publish Now</span>
            </label>

            <button
              type="submit"
              className={`btn btn-primary w-full transition-colors duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Submit Blog
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AddBlog;