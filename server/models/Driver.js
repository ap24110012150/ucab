const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  licenseNumber: { type: String, required: true },
  vehicle: {
    make: String,
    model: String,
    plateNumber: String
  },
  isVerified: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  currentLocation: { lat: Number, lng: Number },
  role: { type: String, default: 'driver' }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
