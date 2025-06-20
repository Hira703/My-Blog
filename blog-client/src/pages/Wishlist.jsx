import React, { useEffect, useState, useContext } from 'react';
import axiosSecure from '../api/axiosSecure';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider';  // your theme context
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaTrash, FaHeart, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // get current theme
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    let isMounted = true;

    axiosSecure
      .get(`/api/wishlist/details/${user.email}`)
      .then((res) => {
        if (isMounted) setWishlist(res.data.data);
      })
      .catch((err) => console.error('Failed to fetch wishlist:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user, navigate]);

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This blog will be removed from your wishlist.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: theme === 'dark' ? '#1f2937' : '#fff', // customize SweetAlert background per theme
      color: theme === 'dark' ? '#f9fafb' : '#111',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/wishlist/${id}`);
        setWishlist((prev) => prev.filter((item) => item._id !== id));

        Swal.fire({
          title: 'Removed!',
          text: 'The blog has been removed from your wishlist.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: theme === 'dark' ? '#1f2937' : '#fff',
          color: theme === 'dark' ? '#f9fafb' : '#111',
        });
      } catch (err) {
        console.error('Error removing wishlist item:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          background: theme === 'dark' ? '#1f2937' : '#fff',
          color: theme === 'dark' ? '#f9fafb' : '#111',
        });
      }
    }
  };

  return (
    <div
      className={`max-w-6xl mx-auto p-6 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        <FaHeart className="text-red-500 animate-pulse" /> My Wishlist ({wishlist.length})
      </h1>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className={`card border rounded-xl shadow-md p-5 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Skeleton height={192} className="rounded-xl mb-3" />
                <Skeleton height={24} width="80%" />
                <Skeleton height={18} width="50%" />
                <Skeleton height={16} count={2} />
                <Skeleton height={20} width="60%" />
              </div>
            ))}
        </div>
      ) : wishlist.length === 0 ? (
        <p className={`italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Your wishlist is empty.
        </p>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {wishlist.map(({ _id, blogDetails }) => (
            <motion.div
              key={_id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              className={`relative flex flex-col h-full card border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <img
                src={blogDetails.image}
                alt={blogDetails.title}
                className="h-48 w-full object-cover rounded-t-2xl"
              />
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div className="space-y-2">
                  <h2
                    className={`text-xl font-semibold line-clamp-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {blogDetails.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 text-xs mt-2">
                    {blogDetails.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-full ${
                          theme === 'dark'
                            ? 'bg-gray-700 text-gray-100'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span
                    className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                      theme === 'dark'
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {blogDetails.category}
                  </span>

                  <p
                    className={`text-sm line-clamp-3 mt-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {blogDetails.shortDescription}
                  </p>
                </div>

                <div
                  className={`mt-4 flex justify-between items-center text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-red-500" /> {blogDetails.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {blogDetails.readTime}
                  </span>
                </div>

                <div className="mt-5 flex justify-between items-center gap-3">
                  <button
                    onClick={() => navigate(`/blog/${blogDetails._id}`)}
                    className="w-full px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleRemove(_id)}
                    className="p-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition"
                    title="Remove from wishlist"
                    aria-label="Remove blog from wishlist"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;
