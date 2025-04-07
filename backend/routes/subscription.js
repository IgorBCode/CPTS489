const express = require('express');
const router = express.Router();
const { subscribeToBoard, unsubscribeFromBoard} = require('../controllers/subscriptionController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/subscribe', verifyToken, subscribeToBoard);
router.post('/unsubscribe', verifyToken, unsubscribeFromBoard);

module.exports = router;