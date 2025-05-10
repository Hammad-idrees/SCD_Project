const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
  const { paymentMethod, amount, transactionId, firstName, lastName, email, street, city, state, zipcode, country, phone, cardNumber } = req.body;
  
  // Validate required fields
  if (!paymentMethod || !amount || !transactionId || !firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone || !cardNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a payment object
    const payment = new Payment({
      paymentMethod,
      amount,
      transactionId,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      cardNumber,
      status: 'Completed',
      createdAt: new Date(),
    });

    // Save the payment to the database
    await payment.save();
    res.status(201).json(payment); // Respond with the created payment object
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Error processing payment", error: error.message });
  }
};

// Get payment details by order ID
const getPaymentByOrderId = async (req, res) => {
  const { orderId } = req.params;
  
  try {
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found for the given order ID" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Error fetching payment details", error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createPayment,
  getPaymentByOrderId,
};
