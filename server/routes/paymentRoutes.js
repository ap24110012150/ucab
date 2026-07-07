const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPayment, getPaymentHistory } = require('../controllers/paymentController');

router.post('/', auth, createPayment);
router.get('/history', auth, getPaymentHistory);

module.exports = router;
