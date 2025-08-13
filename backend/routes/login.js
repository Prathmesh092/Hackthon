const express = require('express');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    switch (role) {
      case 'doctor':
        user = await Doctor.findOne({ email });
        break;
      case 'admin':
        user = await Admin.findOne({ email });
        break;
      default:
        user = await User.findOne({ email, role });
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or role' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
