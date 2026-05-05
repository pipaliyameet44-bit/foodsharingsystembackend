const express = require('express');
const router = express.Router();
const { getFoods, getFoodById, createFood, updateFood, deleteFood } = require('../controllers/foodController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getFoods);
router.get('/:id', getFoodById);
router.post('/', protect, authorize('cook', 'admin'), createFood);
router.put('/:id', protect, authorize('cook', 'admin'), updateFood);
router.delete('/:id', protect, authorize('cook', 'admin'), deleteFood);

module.exports = router;
