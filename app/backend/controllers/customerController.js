// controllers/customerController.js

const Customer = require('../models/Customer');

// Get customer profile details
const getCustomerProfile = async (req, res) => {  
  try {
    const customer = await Customer.findById(req.user.id);  // Find customer by user ID (from JWT)
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);  // Return customer data
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ message: "Error fetching customer data", error });
  }
};

// Update customer profile information
const updateCustomerProfile = async (req, res) => {  
  const { name, phone, address, preferences } = req.body;  // Destructure request body
  
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.user.id,  // Find customer by user ID (from JWT)
      { name, phone, address, preferences },  // Fields to update
      { new: true, runValidators: true }  // Return the updated customer document and run validators
    );
    
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    
    res.status(200).json(updatedCustomer);  // Return updated customer data
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Error updating customer", error });
  }
};

// Export the controller functions
module.exports = {
  getCustomerProfile,
  updateCustomerProfile
};
