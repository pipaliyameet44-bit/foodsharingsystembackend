const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/profile', protect, getUserProfile);

module.exports = router;
