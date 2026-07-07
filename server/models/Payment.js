const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['card', 'upi', 'wallet', 'cash'], default: 'cash' },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  transactionId: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
