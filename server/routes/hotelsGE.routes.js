const express = require('express');
const HotelsGE = require('../models/HotelsGE');
const auth = require('../middleware/auth.middleware');
const Schedule = require('../models/Schedule');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const list = await HotelsGE.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: 'Server error. Try later'
    });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newHotel = await HotelsGE.create({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).send(newHotel);
  } catch (error) {
    res.status(500).json({
      message: 'Server error. Try later'
    });
  }
})

module.exports = router;
