const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  const { items, totalAmount, cookId, deliveryAddress } = req.body;

  if (items && items.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      userId: req.user._id,
      cookId,
      items,
      totalAmount,
      deliveryAddress
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('userId', 'name email').populate('cookId', 'name kitchenInfo');

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// @desc    Get orders for a cook
// @route   GET /api/orders/cook
exports.getCookOrders = async (req, res) => {
  const orders = await Order.find({ cookId: req.user._id }).populate('userId', 'name').sort({ createdAt: -1 });
  res.json(orders);
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // Role-based access control
    if (req.user.role === 'user') {
      // User can only modify their own order
      if (order.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this order' });
      }
      // User can only cancel
      if (req.body.status !== 'cancelled') {
        return res.status(403).json({ message: 'Users can only cancel orders' });
      }
      // User can only cancel pending orders
      if (order.status !== 'pending') {
        return res.status(400).json({ message: 'Can only cancel pending orders' });
      }
    } else if (req.user.role === 'cook') {
      // Cook can only modify orders assigned to them
      if (order.cookId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this order' });
      }
    }

    order.status = req.body.status || order.status;
    if (req.body.rejectReason) {
      order.rejectReason = req.body.rejectReason;
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('userId', 'id name').populate('cookId', 'id name');
  res.json(orders);
};

// @desc    Rate an order
// @route   POST /api/orders/:id/rate
exports.rateOrder = async (req, res) => {
  const { rating, review } = req.body;

  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.userId.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to rate this order' });
      return;
    }
    if (order.status !== 'delivered') {
      res.status(400).json({ message: 'Can only rate delivered orders' });
      return;
    }
    if (order.rating) {
      res.status(400).json({ message: 'Order already rated' });
      return;
    }

    order.rating = Number(rating);
    order.review = review;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};
