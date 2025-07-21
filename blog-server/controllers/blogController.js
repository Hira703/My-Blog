const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

// Create a blog
exports.createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    const db = getDB();

    if (req.user.email !== blogData.author.email) {
      return res.status(403).json({ message: 'Forbidden: Email mismatch' });
    }

    const blog = {
      ...blogData,
      createdAt: new Date(),
      updatedAt: new Date(),
      // wishlistBy: blogData.wishlistBy || [],
      comments: blogData.comments || [],
    };

    const result = await db.collection('blogs').insertOne(blog);

    res.status(201).json({ message: 'Blog created', blogId: result.insertedId });
  } catch (error) {
    console.error('Blog POST error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all blogs
// Get all blogs with optional search and category filters
exports.getAllBlogs = async (req, res) => {
  try {
    const db = getDB();
    const { search, category, author, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (author) {
      query['author.email'] = author;
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Get total count for pagination
    const totalBlogs = await db.collection('blogs').countDocuments(query);

    // Fetch paginated blogs
    const blogs = await db
      .collection('blogs')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .toArray();

    res.status(200).json({
      blogs,
      pagination: {
        total: totalBlogs,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalBlogs / limitNumber),
      },
    });
  } catch (error) {
    console.error('Blog GET error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const db = getDB();
    const blogId = req.params.id;

    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Blog GET by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// **Update a blog by ID**
exports.updateBlog = async (req, res) => {
  try {
    const db = getDB();
    const blogId = req.params.id;
    const updateData = req.body;

    // Find the blog first
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    
    if (req.user.email !== blog.author.email) {
      return res.status(403).json({ success: false, message: 'Forbidden: You can only update your own blogs' });
    }

   
    const fieldsToUpdate = {
      updatedAt: new Date(),
    };

    const updatableFields = [
      'title',
      'slug',
      'image',
      'category',
      'shortDescription',
      'longDescription',
      'tags',
      'readTime',
      'isFeatured',
      'isPublished',
    ];

    updatableFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        fieldsToUpdate[field] = updateData[field];
      }
    });

    if (updateData.title) {
      fieldsToUpdate.slug = updateData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    const result = await db.collection('blogs').updateOne(
      { _id: new ObjectId(blogId) },
      { $set: fieldsToUpdate }
    );

    if (result.modifiedCount === 1) {
      const updatedBlog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) });
      return res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        blog: updatedBlog,
      });
    } else {
      return res.status(400).json({ success: false, message: 'No changes made to the blog' });
    }
  } catch (error) {
    console.error('Blog UPDATE error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// GET /api/blogs/recent
// GET /api/blogs/recent
// const { getDB } = require('../config/db');

exports.getRecentBlogs = async (req, res) => {
  try {
    const db = getDB();
    const limit = parseInt(req.query.limit) || 6;

    const recentPublishedBlogs = await db
      .collection('blogs')
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    res.status(200).json(recentPublishedBlogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recent blogs', error: err.message });
  }
};
// Toggle like/unlike a blog by the logged-in user
exports.toggleLikeBlog = async (req, res) => {
  try {
    const db = getDB();
    const blogId = req.params.id;
    const userEmail = req.user.email;

    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const likedBy = Array.isArray(blog.likedBy) ? blog.likedBy : [];

    let update;

    if (likedBy.includes(userEmail)) {
      // User already liked => unlike
      update = {
        $pull: { likedBy: userEmail },
        $inc: { likes: -1 }, 
        $set: { updatedAt: new Date() }
      };
    } else {
      // User hasn't liked => like
      update = {
        $addToSet: { likedBy: userEmail },
        $inc: { likes: 1 },  
        $set: { updatedAt: new Date() }
      };
    }

    const result = await db.collection('blogs').updateOne(
      { _id: new ObjectId(blogId) },
      update
    );

    if (result.modifiedCount === 1) {
      const updatedBlog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) });
      return res.status(200).json({
        success: true,
        liked: updatedBlog.likedBy.includes(userEmail),
        likes: updatedBlog.likes || 0,
      });
    } else {
      return res.status(400).json({ success: false, message: 'No changes made' });
    }
  } catch (error) {
    console.error('Toggle Like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all blogs liked by the logged-in user
exports.getLikedBlogsByUser = async (req, res) => {
  try {
    const db = getDB();
    const userEmail = req.user.email;

    const likedBlogs = await db.collection('blogs').find({ likedBy: userEmail }).toArray();

    res.status(200).json(likedBlogs);
  } catch (error) {
    console.error('Get liked blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Check if blog is liked by a specific user
exports.isBlogLikedByUser = async (req, res) => {
  try {
    const db = getDB();
    const blogId = req.params.id;
    const email = req.params.email;

    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const liked = blog.likedBy?.includes(email) || false;
    res.status(200).json({ liked });
  } catch (error) {
    console.error('Check liked error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

