const express = require('express');
const router = express.Router();
const { createBoard, 
        getAllBoards,
        getBoardById
     } = require('../controllers/boardController');
const verifyToken = require('../middleware/authMiddleware');

// create board only for logged in user
router.post('/', verifyToken, createBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardById);

module.exports = router;