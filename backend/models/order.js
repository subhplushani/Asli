const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // The user who placed the order
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // The store from which the order was placed
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  // The items in the order
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    variation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariation',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  // Total amount of the order
  totalAmount: {
    type: Number,
    required: true,
  },
  // Shipping address for the order
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  // Order status
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;