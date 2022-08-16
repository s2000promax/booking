const express = require('express');
const auth = require('../middleware/auth.middleware');
const Schedule = require('../models/Schedule');
const router = express.Router({ mergeParams: true });

// /api/comment
router
  .route('/')
  .get(async (req, res) => {
    try {
      const list = await Schedule.find();
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: 'Server error. Try later'
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newSchedule = await Schedule.create({
        ...req.body,
        userId: req.user._id
      });
      res.status(201).send(newSchedule);
    } catch (error) {
      res.status(500).json({
        message: 'Server error. Try later'
      });
    }
  })

router
  .route('/:scheduleId')
  .delete(auth, async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const removedSchedule = await Schedule.findById(scheduleId);

    if (removedSchedule.userId.toString() === req.user._id) {
      await removedSchedule.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error. Try later'
    });
  }
})
  .patch(auth, async (req, res) => {
    try {
      const { scheduleId } = req.params;

      if (scheduleId === req.user._id) {
        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, req.body, { new: true });
        res.send(updatedSchedule);
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Server error. Try later'
      });
    }
  });

module.exports = router;
