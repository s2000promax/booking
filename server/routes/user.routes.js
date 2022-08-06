const express = require('express');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });

// Middleware
const auth = require('../middleware/auth.middleware');

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // todo: userId === current userId
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.status(200).send(updatedUser);
    } else {
      res.status(401).json({
        message: 'Unauthorized'
      });
    }

  } catch (error) {
    res.status(500).json({
      message: 'Server error. Please try again later'
    });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list); // Send to Frontend
  } catch (error) {
    res.status(500).json({
      message: 'Server error. Please try again later'
    });
  }
});

module.exports = router;