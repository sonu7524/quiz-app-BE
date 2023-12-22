const express = require('express');
const User = require('../models/User');
const { generateToken, hashPassword, comparePassword } = require('../utils/authUtils');
const authRouter = express.Router();


// Signup
authRouter.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if(existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    else{
      const hashedPassword = await hashPassword(password);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = generateToken(user);
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = authRouter;
