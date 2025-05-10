const Wishlist = require('../models/Wishlist');

// Get customer wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ customerId: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ customerId: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({
        customerId: req.user.id,
        products: [productId], // Use 'products' here to match the model
        createdAt: new Date(),
      });
      await wishlist.save();
    } else {
      // Check if product already exists in the wishlist to avoid duplicates
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId); // Use 'products' here as well
        wishlist.updatedAt = new Date();
        await wishlist.save();
      } else {
        return res.status(400).json({ message: "Product already in wishlist" });
      }
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ customerId: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const itemIndex = wishlist.products.findIndex(item => item.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    wishlist.products.splice(itemIndex, 1); // Use 'products' here as well
    wishlist.updatedAt = new Date();
    await wishlist.save();

    res.status(200).json({ message: "Product removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};
