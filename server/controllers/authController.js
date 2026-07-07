const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Driver = require('../models/Driver');

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, phone });
    const token = generateToken({ id: user._id, role: user.role });
    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerDriver = async (req, res) => {
  try {
    const { name, email, password, phone, licenseNumber, vehicle } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const driver = await Driver.create({ name, email, password: hashed, phone, licenseNumber, vehicle });
    const token = generateToken({ id: driver._id, role: 'driver' });
    res.status(201).json({ token, driver: { id: driver._id, name, email } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email });
    if (!driver || !(await bcrypt.compare(password, driver.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: driver._id, role: 'driver' });
    res.json({ token, driver: { id: driver._id, name: driver.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
