const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createPayment,
  getPaymentHistory,
  createOrder,
  verifyPayment
} = require('../controllers/paymentController');

router.post('/', auth, createPayment);
router.get('/history', auth, getPaymentHistory);
router.post('/create-order', auth, createOrder);
router.post('/verify', auth, verifyPayment);

module.exports = router;