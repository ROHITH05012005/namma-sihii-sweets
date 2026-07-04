const express = require('express');
const router = express.Router();
const db = require('../db');

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

    // Fallback if no method selected
    return res.status(400).json({ message: 'Invalid payment method' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

module.exports = router;
