// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  preferences: {
    type: [String], // e.g., ['Vegetarian', 'No Dairy']
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // 'admin' or 'user'
    default: 'user', // Default role is 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
