const express = require('express');
const router = express.Router();

const { getComments, addComment, getTopRatedComments } = require('../controllers/commentsController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', getComments);
router.post('/', verifyToken, addComment);
router.get('/top-rated', getTopRatedComments);

module.exports = router;
