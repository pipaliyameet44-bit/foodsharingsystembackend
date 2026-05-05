const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  cookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    title: { type: String },
    quantity: { type: Number, default: 1 },
    price: { type: Number }
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'in-progress', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  deliveryAddress: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  rejectReason: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
