const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  estimateFare, findNearbyDrivers, createRide, updateRideStatus, getUserRides,
  getAvailableRides, acceptRide
} = require('../controllers/rideController');

router.post('/estimate', auth, estimateFare);
router.get('/nearby', auth, findNearbyDrivers);
router.post('/', auth, createRide);
router.put('/:id/status', auth, updateRideStatus);
router.get('/my-rides', auth, getUserRides);
router.get('/available', auth, getAvailableRides);
router.put('/:id/accept', auth, acceptRide);

module.exports = router;
