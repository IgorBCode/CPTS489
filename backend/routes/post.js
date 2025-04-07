const express = require('express');
const router = express.Router();
const { createPost, 
        getPostsByBoard,
        getPostById, 
        getAllPosts, 
        upvotePost, 
        downvotePost
     } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, createPost);
router.get('/all', getAllPosts);
router.post('/:postId/upvote', verifyToken, upvotePost);
router.post('/:postId/downvote', verifyToken, downvotePost);
router.get('/:id', verifyToken, getPostById);
router.get('/board/:boardId', getPostsByBoard);

module.exports = router;