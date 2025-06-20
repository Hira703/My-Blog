const express = require('express');
const {
  addToWishlist,
  getDetailedWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');

const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Add to wishlist
router.post('/', verifyToken, addToWishlist);

// Get wishlist with blog details
router.get('/details/:email', verifyToken, getDetailedWishlist);

// Delete from wishlist
router.delete('/:id', verifyToken, removeFromWishlist);

module.exports = router;
