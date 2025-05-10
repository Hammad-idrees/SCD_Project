const Cart = require('../models/Cart');

// Get customer cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user.id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity, price, rating, description } = req.body;

  try {
    let cart = await Cart.findOne({ customerId: req.user.id });

    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({
        customerId: req.user.id,
        items: [{ productId, quantity, price, rating, description }],
        totalPrice: quantity * price,
        updatedAt: new Date(),
      });
      await cart.save();
    } else {
      // Add the new item to the cart
      cart.items.push({ productId, quantity, price, rating, description });
      cart.totalPrice += quantity * price;
      cart.updatedAt = new Date();
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ customerId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const itemToRemove = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);

    cart.totalPrice -= itemToRemove.quantity * itemToRemove.price;
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};
