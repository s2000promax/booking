const express = require('express')
const auth = require('../middleware/auth.middleware')
const Schedule = require('../models/Schedule')
const router = express.Router({ mergeParams: true })

// /api/comment
router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const list = await Schedule.find();
      res.send(list)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newSchedule = await Schedule.create({
        ...req.body,
        userId: req.user._id
      })
      res.status(201).send(newSchedule)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })

router.delete('/:scheduleId', auth, async (req, res) => {
  try {
    const { scheduleId } = req.params
    const removedSchedule = await Schedule.findById(scheduleId)

    if (removedSchedule.userId.toString() === req.user._id) {
      await removedSchedule.remove()
      return res.send(null)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
});

router.patch('/:scheduleId', auth, async (req, res) => {
  try {
    const { scheduleId } = req.params

    if (scheduleId === req.user._id) {
      const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, req.body, {new: true})
      res.send(updatedSchedule)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
});

module.exports = router;
