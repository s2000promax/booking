const express = require('express');
const HotelsGE = require('../models/HotelsGE');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const qualities = await HotelsGE.find();
    res.status(200).send(qualities);
  } catch (e) {
    res.status(500).json({
      message: 'Server error. Please try again later'
    })
  }
});

module.exports = router;
