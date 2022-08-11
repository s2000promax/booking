const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/auth
router.use('/auth', require('./auth.routes'));
router.use('/user', require('./user.routes'));
router.use('/citiesge', require('./citiesGE.routes'));
router.use('/hotelsge', require('./hotelsGE.routes'));
router.use('/schedule', require('./schedule.routes'));

module.exports = router;
