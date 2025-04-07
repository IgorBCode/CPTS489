const express = require('express');
const router = express.Router();
const { getUserById, changeUsername, changePassword } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/:id', verifyToken, getUserById);
router.post('/change-username', verifyToken, changeUsername);
router.post('/change-password', verifyToken, changePassword);

module.exports = router;