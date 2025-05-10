// controllers/adminController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

// Register a new admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  // Validate that all required fields are provided
  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    // Check if email already exists
    const existingAdmin = await Customer.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user with role 'admin'
    const newAdmin = new Customer({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: 'admin', // Set role as 'admin'
    });

    // Save the admin to the database
    await newAdmin.save();

    // Generate a JWT token for the newly registered admin
    const token = jwt.sign({ id: newAdmin._id, role: newAdmin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response with the token
    res.status(201).json({ message: "Admin registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

// Admin login (generate token)
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password" });
  }

  try {
    // Check if the admin exists
    const admin = await Customer.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token to the admin
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Admin routes for products and users
exports.createProduct = async (req, res) => {
  const { name, description, price, category, availability } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      availability,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Customer.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
