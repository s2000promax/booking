const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// const { generateUserData } = require('../utils/helper');
const tokenService = require('../services/token.service');

const router = express.Router({ mergeParams: true });

// /api/auth/signUp
// 1. get data from req (email, password)
// 2. check if users already exists
// 3.hash password
// 4. creat user
// 5. generate tokens
//  npm install bcryptjs jsonwebtoken express-validator
router.post('/signUp', [
  check('email', 'Email incorrect').isEmail(),
  check('password', 'Password incorrect. Min length must be 8 symbols').isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array()
          }
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400
          }
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        // ...generateUserData(),
        ...req.body,
        password: hashedPassword
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      res.status(201).send({ ...tokens, userId: newUser._id });

      await tokenService.save(newUser._id, tokens.refreshToken);


    } catch (error) {
      res.status(500).json({
        message: 'Server error. Please try again later'
      });
    }
  }]);

// 1. Validate data
// 2. Find user
// 3. Compare hashed password
// 4. generate token
// 5. return data

router.post('/signInWithPassword', [
  check('email', 'Email incorrect').normalizeEmail().isEmail(),
  check('password', 'Password is not be empty').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array()
          }
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400
          }
        });
      }

      const isPasswordEqual = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400
          }
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });

      await tokenService.save(existingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (error) {
      res.status(500).json({
        message: 'Server error. Please try again later'
      });
    }
  }])
;

function isTokenValid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post('/token', async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenValid(data, dbToken)) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const tokens = await tokenService.generate({
      _id: data._id
    });

    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).json({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({
      message: 'Server error. Please try again later'
    });
  }
});

module.exports = router;