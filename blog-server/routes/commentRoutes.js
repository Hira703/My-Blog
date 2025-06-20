const express = require('express');
const router = express.Router();

const { getComments, addComment } = require('../controllers/commentsController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', getComments);
router.post('/', verifyToken, addComment);

module.exports = router;
