const express = require('express');
const router = express.Router();
const { addComment, getCommentsByPost } = require('../controllers/commentController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, addComment);
router.get('/:postId', getCommentsByPost);

module.exports = router;