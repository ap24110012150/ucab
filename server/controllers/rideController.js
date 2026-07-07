const Ride = require('../models/Ride');
const Driver = require('../models/Driver');

const getDistanceKm = (a, b) => {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

exports.estimateFare = async (req, res) => {
  const { pickup, dropoff } = req.body;
  const distanceKm = getDistanceKm(pickup, dropoff);
  const fareEstimate = Math.round(40 + distanceKm * 12);
  res.json({ distanceKm: distanceKm.toFixed(2), fareEstimate });
};

exports.findNearbyDrivers = async (req, res) => {
  const { lat, lng, radiusKm = 5 } = req.query;
  const drivers = await Driver.find({ isAvailable: true, isVerified: true });
  const nearby = drivers.filter(d =>
    d.currentLocation && getDistanceKm({ lat: +lat, lng: +lng }, d.currentLocation) <= radiusKm
  );
  res.json(nearby);
};

exports.createRide = async (req, res) => {
  const ride = await Ride.create({ ...req.body, user: req.user.id });
  res.status(201).json(ride);
};

exports.updateRideStatus = async (req, res) => {
  const ride = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ride);
};

exports.getUserRides = async (req, res) => {
  const rides = await Ride.find({ user: req.user.id }).populate('driver');
  res.json(rides);
};

exports.getAvailableRides = async (req, res) => {
  const rides = await Ride.find({ status: 'requested' }).populate('user', 'name phone');
  res.json(rides);
};

exports.acceptRide = async (req, res) => {
  const ride = await Ride.findByIdAndUpdate(
    req.params.id,
    { driver: req.user.id, status: 'accepted' },
    { new: true }
  );
  res.json(ride);
};