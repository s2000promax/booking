const express = require('express');
const CitiesGE = require('../models/CitiesGE');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const list = await CitiesGE.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: 'Server error. Try later'
    });
  }
});

module.exports = router;
