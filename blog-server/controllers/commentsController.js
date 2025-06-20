const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

async function getComments(req, res) {
  const { blogId } = req.query;
  if (!blogId) return res.status(400).json({ message: 'blogId query parameter is required' });

  try {
    const db = getDB();
    const comments = await db
      .collection('comments')
      .find({ blogId: new ObjectId(blogId) })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function addComment(req, res) {
  const { blogId, text, userName, userImage } = req.body;

  if (!blogId || !text || !userName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const db = getDB();
    const comment = {
      blogId: new ObjectId(blogId),
      text,
      userName,
      userImage: userImage || null,
      createdAt: new Date(),
    };

    await db.collection('comments').insertOne(comment);

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

module.exports = {
  getComments,
  addComment,
};
