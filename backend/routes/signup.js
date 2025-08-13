const express = require('express');
const bcrypt = require('bcrypt');
const zxcvbn = require('zxcvbn');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  console.log('Received data:', req.body);

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    // Check password strength
    const passwordCheck = zxcvbn(password);
    if (passwordCheck.score < 3) {
      return res.status(400).send({
        error: 'Weak password',
        suggestions: passwordCheck.feedback.suggestions
      });
    }

    // Hash the password before saving
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword); // Debug log

    const user = new User({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword,
      role 
    });

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
