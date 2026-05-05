const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  getMyOrders, 
  getCookOrders, 
  updateOrderStatus, 
  getOrders,
  rateOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/cook', protect, authorize('cook', 'admin'), getCookOrders);
router.get('/:id', protect, getOrderById);
router.post('/:id/rate', protect, rateOrder);
router.put('/:id/status', protect, updateOrderStatus);
router.get('/', protect, authorize('admin'), getOrders);

module.exports = router;
