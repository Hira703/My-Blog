const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/recent', blogController.getRecentBlogs);
router.get('/liked/user', verifyToken, blogController.getLikedBlogsByUser);
router.get('/:id/liked-by/:email', verifyToken, blogController.isBlogLikedByUser);
router.post('/', verifyToken, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', verifyToken, blogController.getBlogById);
router.put('/:id', verifyToken, blogController.updateBlog);
router.post('/:id/like', verifyToken, blogController.toggleLikeBlog);

module.exports = router;
