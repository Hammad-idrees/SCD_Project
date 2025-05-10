// models/Admin.js
const mongoose = require('mongoose');
const Customer = require('./Customer');  // Import the Customer model to extend

// Admin schema extends Customer schema
const adminSchema = new mongoose.Schema({
  // You can add admin-specific fields here if needed in the future
}, { discriminatorKey: 'role' });  // Use discriminatorKey to indicate the role as 'admin'

const Admin = Customer.discriminator('admin', adminSchema);  // 'admin' is the role for this model

module.exports = Admin;