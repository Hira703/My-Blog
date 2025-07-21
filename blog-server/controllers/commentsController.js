const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

// GET /api/comments?blogId=xxx
async function getComments(req, res) {
  const { blogId } = req.query;
  const userEmail = req.user?.email;

  if (!blogId) {
    return res.status(400).json({ message: 'blogId query parameter is required' });
  }

  try {
    const db = getDB();

    // Get all comments for the blog
    const comments = await db
      .collection('comments')
      .find({ blogId: new ObjectId(blogId) })
      .sort({ createdAt: -1 })
      .toArray();

    let hasReviewed = false;
    let isOwner = false;

    if (userEmail) {
      // Get blog to compare author email
      const blog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) });

      if (blog) {
        isOwner = blog.authorEmail === userEmail;

        if (!isOwner) {
          // Check if user already reviewed
          const existingReview = await db.collection('comments').findOne({
            blogId: new ObjectId(blogId),
            userEmail,
          });

          hasReviewed = !!existingReview;
        }
      }
    }

    res.json({
      comments,
      hasReviewed,
      isOwner,
    });
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// POST /api/comments
async function addComment(req, res) {
  const { blogId, text, userName, userImage, rating } = req.body;
  const userEmail = req.user?.email;
  console.log(req.body);

  if (!blogId || !text || !userName || rating == null || !userEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
  }

  try {
    const db = getDB();

    // Get blog to compare author email
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(blogId) });
    if (blog?.authorEmail === userEmail) {
      return res.status(403).json({ message: 'You cannot review your own blog' });
    }

    // Check if already reviewed
    const alreadyReviewed = await db.collection('comments').findOne({
      blogId: new ObjectId(blogId),
      userEmail,
    });
    if (alreadyReviewed) {
      return res.status(409).json({ message: 'You have already reviewed this blog' });
    }

    // Create new review
    const comment = {
      blogId: new ObjectId(blogId),
      text,
      rating,
      userName,
      userImage: userImage || null,
      userEmail,
      createdAt: new Date(),
    };

    await db.collection('comments').insertOne(comment);

    // Return updated comment list
    const updatedComments = await db
      .collection('comments')
      .find({ blogId: new ObjectId(blogId) })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(201).json(updatedComments);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// GET /api/comments/top-rated
async function getTopRatedComments(req, res) {
  try {
    const db = getDB();

    // Find top 3 comments across all blogs
    const topComments = await db
      .collection('comments')
      .find()
      .sort({ rating: -1, createdAt: -1 }) 
      .limit(3)
      .toArray();

    res.json(topComments);
  } catch (err) {
    console.error('Error fetching top rated comments:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getComments,
  addComment,
  getTopRatedComments
};
