const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  pickup: { address: String, lat: Number, lng: Number },
  dropoff: { address: String, lat: Number, lng: Number },
  fareEstimate: Number,
  finalFare: Number,
  status: {
    type: String,
    enum: ['requested', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'requested'
  },
  distanceKm: Number,
  startedAt: Date,
  completedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
