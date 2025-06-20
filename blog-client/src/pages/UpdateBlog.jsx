import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosSecure from '../api/axiosSecure';

const CATEGORIES = [
  'Tech', 'Travel', 'Food', 'Lifestyle', 'Business', 'Health',
  'Education', 'Finance', 'Career', 'Entertainment',
  'Science', 'DIY & Crafts', 'News & Politics', 'Environment', 'Opinion'
];

const UpdateBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // blog id from route param

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // for initial data fetch
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    shortDescription: '',
    longDescription: '',
    tags: '',
    readTime: '',
    isFeatured: false,
    isPublished: false,
  });

  // Fetch existing blog data on mount
  useEffect(() => {
    if (!id) return;

    setLoadingData(true);
    axiosSecure.get(`/api/blogs/${id}`)
      .then(res => {
        const blog = res.data;
        console.log(blog)
        if (!blog) {
          Swal.fire({
            icon: 'error',
            title: 'Blog not found',
            text: 'The blog you are trying to update does not exist.',
            confirmButtonColor: '#ef4444',
          });
          navigate('/all-blogs');
          return;
        }

        setSelectedCategory(blog.category || '');
        setFormData({
          title: blog.title || '',
          image: blog.image || '',
          shortDescription: blog.shortDescription || '',
          longDescription: blog.longDescription || '',
          tags: (blog.tags && blog.tags.join(', ')) || '',
          readTime: blog.readTime ? parseInt(blog.readTime) : '',
          isFeatured: !!blog.isFeatured,
          isPublished: !!blog.isPublished,
        });
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load blog data.',
          confirmButtonColor: '#ef4444',
        });
        navigate('/all-blogs');
      })
      .finally(() => setLoadingData(false));
  }, [id, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div className="bg-base-200 p-10 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Please log in to update a blog</h2>
        </div>
      </div>
    );
  }

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const wrapWithP = (text) => {
    const trimmed = text.trim();
    return trimmed.startsWith('<p>') ? trimmed : `<p>${trimmed}</p>`;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Category',
        text: 'Please select one category for your blog.',
        confirmButtonColor: '#6366f1',
      });
      return;
    }

    const updatedBlog = {
      title: formData.title.trim(),
      slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      image: formData.image.trim(),
      category: selectedCategory,
      shortDescription: formData.shortDescription.trim(),
      longDescription: wrapWithP(formData.longDescription),
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      readTime: `${formData.readTime} min`,
      isFeatured: formData.isFeatured,
      isPublished: formData.isPublished,
      updatedAt: new Date().toISOString(),
      author: {
        name: user?.displayName || 'Anonymous',
        email: user?.email,
        photo: user?.photoURL || null,
      },
    };

    try {
        setLoading(true);
        const res = await axiosSecure.put(`/api/blogs/${id}`, updatedBlog);
        console.log(res.data);
      
        // Adjust this check based on what your backend actually returns
        if (res.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Blog updated!',
            text: 'Your blog was updated successfully.',
            confirmButtonColor: '#6366f1',
          }).then(() => navigate(`/blog/${id}`));
        } else {
          throw new Error('Update failed');
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong while updating the blog.',
          confirmButtonColor: '#ef4444',
        });
      } finally {
        setLoading(false);
      }
      
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-base-200 p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Update Blog</h2>
      <form onSubmit={handleUpdateBlog} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.image}
          onChange={handleInputChange}
          required
        />

        <div className="form-control">
          <label className="label font-semibold">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="shortDescription"
          placeholder="Short Description"
          className="textarea textarea-bordered w-full"
          value={formData.shortDescription}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="longDescription"
          placeholder="Long Description"
          className="textarea textarea-bordered w-full"
          value={formData.longDescription}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="input input-bordered w-full"
          value={formData.tags}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="readTime"
          placeholder="Read Time (in mins)"
          className="input input-bordered w-full"
          min="1"
          value={formData.readTime}
          onChange={handleInputChange}
          required
        />

        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            className="checkbox checkbox-info"
            checked={formData.isFeatured}
            onChange={handleInputChange}
          />
          <span>Mark as Featured</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="isPublished"
            className="checkbox checkbox-accent"
            checked={formData.isPublished}
            onChange={handleInputChange}
          />
          <span className="text-base-content dark:text-gray-300">Publish Now</span>
        </label>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
