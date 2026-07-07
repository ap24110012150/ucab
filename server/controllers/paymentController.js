const Payment = require('../models/Payment');
const Ride = require('../models/Ride');

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
