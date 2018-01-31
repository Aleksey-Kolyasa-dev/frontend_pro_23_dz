const express = require('express');
const router = express.Router();
const auth = require('./auth.routes');
const markers = require('./markers.routes');

router.use('/user', auth);
router.use('/markers', markers);

module.exports = router;