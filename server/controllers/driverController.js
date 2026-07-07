const Driver = require('../models/Driver');

exports.getAllDrivers = async (req, res) => {
  const drivers = await Driver.find().select('-password');
  res.json(drivers);
};

exports.verifyDriver = async (req, res) => {
  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    { isVerified: true },
    { new: true }
  ).select('-password');
  res.json(driver);
};