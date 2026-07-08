const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Ride = require('../models/Ride');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createPayment = async (req, res) => {
  const { rideId, amount, method } = req.body;
  const payment = await Payment.create({
    ride: rideId, user: req.user.id, amount, method,
    status: 'success', transactionId: 'TXN' + Date.now()
  });
  await Ride.findByIdAndUpdate(rideId, { finalFare: amount, status: 'completed', completedAt: new Date() });
  res.status(201).json(payment);
};

exports.getPaymentHistory = async (req, res) => {
  const payments = await Payment.find({ user: req.user.id }).populate('ride');
  res.json(payments);
};

// Creates a Razorpay order before showing the checkout popup
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay uses paise, not rupees
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    });
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create Razorpay order' });
  }
};

// Verifies the payment is genuinely from Razorpay (not faked), then saves it
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, rideId, amount } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: 'Payment verification failed' });
  }

  const payment = await Payment.create({
    ride: rideId, user: req.user.id, amount, method: 'card',
    status: 'success', transactionId: razorpay_payment_id
  });
  await Ride.findByIdAndUpdate(rideId, { finalFare: amount, status: 'completed', completedAt: new Date() });
  res.status(201).json(payment);
};