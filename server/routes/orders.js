const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const db = require('../db');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Middleware to verify JWT could go here, omitting for simplicity in prototype
// Assuming userId is sent in body for now, in prod use JWT extraction

router.post('/create', async (req, res) => {
  const { amount, userId, method, upiRef } = req.body;

  try {
    if (method === 'cod' || method === 'upi') {
      const status = method === 'cod' ? 'pending_cod' : 'pending_upi';
      db.run(
        'INSERT INTO orders (user_id, amount, status, razorpay_order_id) VALUES (?, ?, ?, ?)',
        [userId || null, amount, status, upiRef || `manual_${Date.now()}`],
        function(err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving order' });
          }
          res.json({ id: this.lastID, amount, status });
        }
      );
      return;
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    
    // Save pending order to DB
    db.run(
      'INSERT INTO orders (user_id, amount, status, razorpay_order_id) VALUES (?, ?, ?, ?)',
      [userId || null, amount, 'created', order.id],
      function(err) {
        if (err) console.error(err);
      }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Verify signature
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    // Payment is successful
    db.run(
      'UPDATE orders SET status = ?, razorpay_payment_id = ? WHERE razorpay_order_id = ?',
      ['paid', razorpay_payment_id, razorpay_order_id],
      (err) => {
        if (err) return res.status(500).json({ message: 'Error updating order', error: err.message });
        res.json({ message: "Payment verified successfully" });
      }
    );
  } else {
    res.status(400).json({ message: "Invalid signature sent!" });
  }
});

module.exports = router;
