const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authControllers');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyToken, (req, res) => {
    res.json({ message: 'Authenticated user', user: req.user });
});

module.exports = router;