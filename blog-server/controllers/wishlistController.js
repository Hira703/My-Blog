const { getDB } = require("../config/db.js");
const { ObjectId } = require("mongodb");

// Add to wishlist
const addToWishlist = async (req, res) => {
  const db = getDB();
  const { userEmail, blogId } = req.body;

  if (!userEmail || !blogId) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    const existing = await db.collection('wishlist').findOne({
      userEmail,
      blogId: new ObjectId(blogId),
    });

    if (existing) {
      return res.status(200).json({ success: false, message: 'Already in wishlist' });
    }

    await db.collection('wishlist').insertOne({
      userEmail,
      blogId: new ObjectId(blogId),
      addedAt: new Date(),
    });

    res.status(201).json({ success: true, message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get wishlist with blog details
const getDetailedWishlist = async (req, res) => {
  const db = getDB();
  const email = req.params.email;

  try {
    const data = await db.collection('wishlist').aggregate([
      { $match: { userEmail: email } },
      {
        $lookup: {
          from: 'blogs',
          localField: 'blogId',
          foreignField: '_id',
          as: 'blogDetails',
        },
      },
      { $unwind: '$blogDetails' },
    ]).toArray();

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete from wishlist
const removeFromWishlist = async (req, res) => {
  const db = getDB();
  const id = req.params.id;

  try {
    await db.collection('wishlist').deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  addToWishlist,
  getDetailedWishlist,
  removeFromWishlist,
};
