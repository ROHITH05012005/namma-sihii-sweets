const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Login with Email or Phone
router.post('/login', (req, res) => {
  const { email, phone, password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  let query = '';
  let params = [];

  if (email) {
    query = 'SELECT * FROM users WHERE email = ?';
    params = [email];
  } else if (phone) {
    query = 'SELECT * FROM users WHERE phone = ?';
    params = [phone];
  } else {
    return res.status(400).json({ message: 'Email or phone is required' });
  }

  db.get(query, params, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  });
});

// Register
router.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || (!email && !phone) || !password) {
    return res.status(400).json({ message: 'Please provide name, email/phone, and password' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(
    'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [name, email || null, phone || null, hashedPassword],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ message: 'Email or phone already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      
      const token = jwt.sign({ id: this.lastID }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.status(201).json({ token, user: { id: this.lastID, name, email, phone } });
    }
  );
});

module.exports = router;
