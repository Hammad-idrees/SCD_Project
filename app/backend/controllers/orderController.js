const Order = require('../models/Order');

// Place a new order
exports.placeOrder = async (req, res) => {
  const { items, totalAmount, deliveryAddress } = req.body;
  
  try {
    const newOrder = new Order({
      customerId: req.user.id,
      items,
      totalAmount,
      orderStatus: 'Pending',
      paymentStatus: 'Pending',
      deliveryAddress,
      createdAt: new Date(),
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// Get an order by its ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId); // Use the route parameter 'orderId'
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Get all orders for a customer
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
