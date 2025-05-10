// productController.js

const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);  // Use 'productId' here to match the route param
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Create a new product (admin only)
exports.createProduct = async (req, res) => {
  const { name, description, price, category, availability } = req.body;
  
  // You can add additional validation here, for example checking if the user is an admin
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
