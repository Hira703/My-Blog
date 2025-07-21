import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import axiosSecure from '../api/axiosSecure';
import {
  FaUserCircle,
  FaTag,
  FaClock,
  FaCalendarAlt,
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaCheckCircle,
  FaStar,
  FaTimesCircle,
} from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import { ThemeContext } from '../context/ThemeProvider';
import Swal from 'sweetalert2';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
 
  const [rating, setRating] = useState(0); // new rating state
  const [hover, setHover] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);

  const Star = ({ filled }) => (
    <svg
      className={`w-6 h-6 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.956c.3.92-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.197-1.54-1.118l1.286-3.956a1 1 0 00-.364-1.118L2.036 9.384c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
  console.log(user)
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchBlog = async () => {
      try {
        const { data } = await axiosSecure.get(`/api/blogs/${id}`);
        setBlog(data);
        setLikesCount(data.likes || 0);
        if (user?.email && data?.author?.email === user.email) {
          setIsOwner(true);
        }
        const { data: likeStatus } = await axiosSecure.get(`/api/blogs/${id}/liked-by/${user.email}`);
        setLiked(likeStatus.liked);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id, user, navigate]);

  useEffect(() => {
    if (blog?._id) {
      const fetchComments = async () => {
        try {
          const { data } = await axiosSecure.get(`/api/comments?blogId=${blog._id}`);
          setComments(data.comments);
          setHasReviewed(data.hasReviewed); // <-- track if user already reviewed
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      fetchComments();
    }
    
  }, [blog]);


  const toggleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await axiosSecure.post(`/api/blogs/${id}/like`, {
        userEmail: user.email,
      });

      setLiked(data.liked);
      setLikesCount(data.likes);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
  
    if (rating < 1 || rating > 5) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Rating',
        text: 'Please provide a rating between 1 and 5 stars.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
  
    const commentData = {
      blogId: blog._id,
      text: newComment,
      rating,
      userName: user.displayName||'User',
      userImage: user.photoURL||'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    };
    try {
      const { data: updatedComments } = await axiosSecure.post('/api/comments', commentData);
      setNewComment('');
      setRating(0);
      setComments(updatedComments);
    
      Swal.fire({
        icon: 'success',
        title: 'Comment Added',
        text: 'Your comment was posted successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error posting comment:', error);
    
      if (error.response?.status === 409) {
        Swal.fire({
          icon: 'info',
          title: 'Already Reviewed',
          text: 'You have already reviewed this blog.',
          confirmButtonColor: '#3085d6',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while posting your comment.',
          confirmButtonColor: '#d33',
        });
      }
    }
    
  };
  

  if (!blog)
    return <div className="text-center p-10 text-xl font-semibold">Loading...</div>;

  return (
    <div
      className={`max-w-5xl mx-auto p-6 space-y-10 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Theme indicator example */}
      {/* <div className="text-right italic mb-4 text-sm">
        Theme: <span className={theme === 'dark' ? 'text-yellow-300' : 'text-blue-600'}>{theme}</span>
      </div> */}

      <div
        className={`shadow-lg rounded-lg overflow-hidden border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
        }`}
      >
        <PhotoProvider>
          <PhotoView src={blog.image}>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-t-lg cursor-zoom-in"
              loading="lazy"
            />
          </PhotoView>
        </PhotoProvider>

        <div className="p-8">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
            <h1
              className={`text-4xl font-extrabold ${
                theme === 'dark' ? 'text-yellow-300' : 'text-blue-800'
              }`}
            >
              {blog.title}
            </h1>

            {/* Status Indicators */}
            <div className="flex gap-4 items-center">
              {blog.isPublished ? (
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}
                  title="Published"
                >
                  <FaCheckCircle /> Published
                </span>
              ) : (
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}
                  title="Not Published"
                >
                  <FaTimesCircle /> Draft
                </span>
              )}

              {blog.featured && (
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
                  }`}
                  title="Featured"
                >
                  <FaStar /> Featured
                </span>
              )}

              {/* Like Button */}
              <button
                onClick={toggleLike}
                aria-label={liked ? 'Unlike this blog' : 'Like this blog'}
                className={`flex items-center gap-2 text-2xl font-semibold transition-colors focus:outline-none focus:ring-2 rounded ${
                  liked
                    ? theme === 'dark'
                      ? 'text-red-400 focus:ring-red-400'
                      : 'text-red-600 focus:ring-red-600'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:text-red-400 focus:ring-red-400'
                    : 'text-gray-400 hover:text-red-500 focus:ring-red-600'
                }`}
                title={liked ? 'Unlike' : 'Like'}
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
                <span className="text-xl">{likesCount}</span>
              </button>
            </div>
          </div>

          <div
            className={`flex flex-wrap items-center gap-5 mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaTag className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
              <span className="font-medium">{blog.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
              <span>{blog.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className={theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {blog.tags &&
                blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      theme === 'dark'
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>

          <div
            className={`prose max-w-none prose-lg ${
              theme === 'dark' ? 'prose-invert text-gray-300' : ''
            }`}
            dangerouslySetInnerHTML={{ __html: blog.longDescription }}
          ></div>

          <div
            className={`flex items-center gap-4 mt-10 border-t pt-6 rounded-md ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'
            }`}
          >
            <img
              src={blog.author.photo || 'https://i.ibb.co/N3pVtYZ/default-user.png'}
              alt="Author"
              className="w-14 h-14 rounded-full shadow-md"
              loading="lazy"
            />
            <div>
              <p
                className={`font-semibold text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {blog.author.name}
              </p>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {blog.author.email}
              </p>
            </div>
          </div>

          {isOwner && (
  <div className="mt-8">
    <button
      onClick={() => navigate(`/update-blog/${blog._id}`)}
      className={`px-6 py-2 rounded-lg font-semibold transition ${
        theme === 'dark'
          ? 'btn-outline btn-primary text-yellow-300 border-yellow-300 hover:bg-yellow-400 hover:text-gray-900'
          : 'btn-outline btn-primary text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white'
      }`}
    >
      Edit Blog
    </button>
  </div>
)}

</div>
</div>

<section>
  <h2
    className={`text-3xl font-bold mb-6 ${
      theme === 'dark' ? 'text-yellow-300' : 'text-blue-800'
    }`}
  >
    Reviews ({comments.length})
  </h2>

  {/* Conditionally show review form or owner message */}
  {isOwner ? (
    <div
      className={`mb-6 p-6 text-center rounded-lg border shadow-sm font-semibold ${
        theme === 'dark'
          ? 'bg-gray-900 border-yellow-400 text-yellow-300'
          : 'bg-blue-50 border-blue-400 text-blue-700'
      }`}
    >
      🚫 You cannot review your own blog.
    </div>
  ) : (
    <form onSubmit={handleCommentSubmit} className="mb-6">
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Star filled={star <= (hover || rating)} />
          </button>
        ))}
      </div>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        required
        placeholder="Write your review here..."
        rows={4}
        className={`w-full rounded-md border p-3 resize-none focus:outline-none focus:ring-2 transition ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-yellow-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-600 focus:ring-blue-500'
        }`}
      ></textarea>

      <button
        type="submit"
        className={`mt-2 px-5 py-2 rounded-md font-semibold transition ${
          theme === 'dark'
            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
            : 'bg-blue-700 text-white hover:bg-blue-600'
        }`}
      >
        Add Review
      </button>
    </form>
  )}

  {/* Reviews List */}
  <div className="space-y-4">
    {comments.length === 0 ? (
      <p
        className={`text-center italic ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        No reviews yet. Be the first to leave one!
      </p>
    ) : (
      comments.map((comment) => (
        <div
          key={comment._id}
          className={`flex gap-4 p-4 rounded-md shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <img
            src={comment.userImage || 'https://i.ibb.co/N3pVtYZ/default-user.png'}
            alt={comment.userName}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <p
              className={`font-semibold ${
                theme === 'dark' ? 'text-yellow-300' : 'text-blue-800'
              }`}
            >
              {comment.userName}
            </p>
            {/* Display Star Rating */}
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} filled={star <= comment.rating} />
              ))}
            </div>
            <p
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {comment.text}
            </p>
            <small
              className={`text-xs ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              {new Date(comment.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      ))
    )}
  </div>
</section>

    </div>
  );
};

export default BlogDetails;
