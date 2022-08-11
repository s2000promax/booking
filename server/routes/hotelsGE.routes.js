const express = require('express');
const HotelsGE = require('../models/HotelsGE');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const list = await HotelsGE.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: 'Server error. Try later'
    });
  }
});

module.exports = router;