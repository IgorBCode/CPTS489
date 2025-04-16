const express = require('express');
const router = express.Router();
const { createPost, 
        getPostsByBoard,
        getPostById, 
        getAllPosts, 
        votePost 
     } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, createPost);
router.get('/all', getAllPosts);
router.post('/:postId/vote', verifyToken, votePost);
router.get('/:id', getPostById);
router.get('/board/:boardId', getPostsByBoard);

module.exports = router;