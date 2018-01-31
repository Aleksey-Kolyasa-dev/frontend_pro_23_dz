const express = require('express');
const router = express.Router();
const controller = require('../controllers/markers.controller');

router.get('/:id', controller.getMarkers);
router.put('/:id', controller.saveMarkers);

module.exports = router;
