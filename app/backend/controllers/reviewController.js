// controllers/reviewController.js

const Review = require('../models/Review');

// Submit a review
const submitReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  
  try {
    const newReview = new Review({
      customerId: req.user.id,
      productId,
      rating,
      comment,
      createdAt: new Date(),
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Error submitting review", error: error.message });
  }
};

// Get all reviews for a product by its ID
const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;
  
  try {
    const reviews = await Review.find({ productId })
      .populate('customerId', 'name') // Assuming customerId references a Customer model
      .sort({ createdAt: -1 }); // Optional: Sort reviews by creation date (newest first)
    
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

// Export the controller functions
module.exports = {
  submitReview,
  getReviewsByProduct,
};
