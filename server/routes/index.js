const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/auth
router.use('/auth', require('./auth.routes'));
router.use('/citiesge', require('./citiesge.routes'));
router.use('/hotelsge', require('./hotelsge.routes'));
router.use('/user', require('./user.routes'));

module.exports = router;
