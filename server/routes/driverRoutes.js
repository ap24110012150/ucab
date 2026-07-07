const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { getAllDrivers, verifyDriver } = require('../controllers/driverController');

router.get('/', auth, role('admin'), getAllDrivers);
router.put('/:id/verify', auth, role('admin'), verifyDriver);

module.exports = router;