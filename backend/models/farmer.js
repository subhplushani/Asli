const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // The farmer's store
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  },
  // Address information
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
}, { timestamps: true });

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;