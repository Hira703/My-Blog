import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider';
import Swal from 'sweetalert2';
import axiosSecure from '../api/axiosSecure';
import fallbackAvatar from '../assets/images/user-profile.png';
import { FaStar } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/blog/${blog._id}`);
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/blog/${blog._id}` } });
      return;
    }

    const wishlistItem = {
      blogId: blog._id,
      userEmail: user.email,
      addedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/api/wishlist', wishlistItem);
      const data = res.data;

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Blog added to wishlist!',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Note',
          text: data.message || 'Blog already in wishlist.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to add to wishlist.',
      });
      console.error(err);
    }
  };

  // Base card classes with theme
  const cardClasses =
    theme === 'dark'
      ? 'card card-compact bg-gray-800 text-gray-100 shadow-lg hover:shadow-2xl border border-gray-600 rounded-xl overflow-hidden transition-all duration-300'
      : 'card card-compact bg-white text-gray-900 shadow-md hover:shadow-xl border border-gray-200 rounded-xl overflow-hidden transition-all duration-300';

  // Featured styling overrides
  const featuredClasses = blog.isFeatured
    ? theme === 'dark'
      ? 'border-yellow-400 shadow-yellow-400/50 shadow-lg'
      : 'border-yellow-500 shadow-yellow-300 shadow-lg'
    : '';

  const combinedCardClasses = `${cardClasses} ${featuredClasses}`;

  const titleClasses =
    theme === 'dark'
      ? 'card-title text-xl font-bold hover:text-primary transition-colors text-white'
      : 'card-title text-xl font-bold hover:text-primary transition-colors text-gray-800';

  const textClasses =
    theme === 'dark' ? 'text-sm text-gray-300 mt-2 line-clamp-3' : 'text-sm text-gray-600 mt-2 line-clamp-3';

  const badgeClasses = theme === 'dark'
    ? 'badge badge-outline border-gray-400 text-gray-300'
    : 'badge badge-outline';

  const badgePrimaryClasses = theme === 'dark'
    ? 'badge badge-primary badge-outline text-xs bg-gray-700 border-gray-600'
    : 'badge badge-primary badge-outline text-xs';

  const footerClasses = theme === 'dark'
    ? 'mt-auto flex items-center justify-between text-gray-400 text-sm pt-4 border-t border-gray-700'
    : 'mt-auto flex items-center justify-between text-gray-600 text-sm pt-4 border-t border-gray-200';

  const authorNameClasses = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';

  return (
    <div className={`relative ${combinedCardClasses}`}>
      {/* Featured badge */}
      {blog.isFeatured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow-md select-none">
          <FaStar />
          <span>Featured</span>
        </div>
      )}

      <figure>
        <img
          src={blog.image}
          alt={blog.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </figure>

      <div className="card-body flex flex-col flex-grow p-5 relative">
        <h2 className={titleClasses}>{blog.title}</h2>

        <p className={textClasses}>{blog.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className={badgeClasses}>{blog.category}</span>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            ⏱ {blog.readTime} read
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {blog.tags.map((tag) => (
            <span key={tag} className={badgePrimaryClasses}>
              #{tag}
            </span>
          ))}
        </div>

        <div className={footerClasses}>
          <div className="flex items-center gap-2">
            {blog.author.photo ? (
              <img
                src={blog.author.photo}
                alt={blog.author.name}
                className="w-7 h-7 rounded-full"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackAvatar;
                }}
              />
            ) : (
              <img
                src={fallbackAvatar}
                alt="Default avatar"
                className="w-7 h-7 rounded-full bg-gray-400 dark:bg-gray-600"
              />
            )}
            <span className={authorNameClasses}>{blog.author.name}</span>
          </div>

          <button
            onClick={handleViewDetails}
            className={
              theme === 'dark'
                ? 'flex items-center gap-1 text-sm text-gray-400 hover:text-primary focus:outline-none'
                : 'flex items-center gap-1 text-sm text-gray-600 hover:text-primary focus:outline-none'
            }
            aria-label="View blog details and like"
          >
            <span>❤️</span> <span>{blog.likes}</span>
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleViewDetails}
            className="btn btn-sm btn-primary hover:scale-105 transition-transform"
          >
            View Details
          </button>
          <button
            onClick={handleAddToWishlist}
            className="btn btn-sm btn-outline btn-secondary hover:scale-105 transition-transform"
          >
            🤍 Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
