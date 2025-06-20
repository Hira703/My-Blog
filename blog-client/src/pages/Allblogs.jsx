import React, { useContext, useEffect, useState } from 'react';
import axiosSecure from '../api/axiosSecure';
import BlogCard from '../components/BlogCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ThemeContext } from '../context/ThemeProvider';

const Allblogs = () => {
  const { theme } = useContext(ThemeContext);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get('/api/blogs');
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchBlogs();
      return;
    }

    setSearching(true);
    try {
      const res = await axiosSecure.get(`/api/blogs?search=${encodeURIComponent(searchQuery)}`);
      setBlogs(res.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleToggleLike = async (blogId) => {
    try {
      const res = await axiosSecure.post(`/api/blogs/${blogId}/like`);
      const updatedBlog = res.data.updatedBlog;

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? updatedBlog : blog
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const filteredBlogs = blogs
    .filter(blog =>
      category ? blog.category?.toLowerCase() === category.toLowerCase() : true
    )
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'mostLiked') return (b.likes || 0) - (a.likes || 0);
      return 0;
    });

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, i) => (
      <div
        key={i}
        className={`p-4 rounded shadow-md ${
          theme === 'light' ? 'bg-white' : 'bg-gray-800'
        }`}
      >
        <Skeleton height={200} className="mb-4" />
        <Skeleton height={24} width="80%" className="mb-2" />
        <Skeleton height={20} width="60%" />
      </div>
    ));
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-4 py-10 min-h-screen
      ${theme === 'light' ? 'bg-gray-200 text-base-content' : 'bg-gray-900 text-gray-100'}`}
    >
      <h1
        className={`text-4xl font-extrabold mb-6 text-center
        ${theme === 'light' ? 'text-primary' : 'text-indigo-400'}`}
      >
        All Blogs
      </h1>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`input input-bordered w-full sm:w-96 ${
            theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'
          }`}
        />
        <button type="submit" className="btn btn-primary">
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <select
          className={`select select-bordered w-full sm:w-64 ${
            theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'
          }`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
        </select>

        <select
          className={`select select-bordered w-full sm:w-64 ${
            theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'
          }`}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostLiked">Most Liked</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderSkeletons()}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-lg font-medium">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog._id || blog.slug}
              blog={blog}
              onToggleLike={() => handleToggleLike(blog._id)}
              theme={theme} // optional, remove if BlogCard uses ThemeContext internally
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Allblogs;
