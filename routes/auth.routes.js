const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/registration', controller.registration);
router.put('/login', controller.login);
router.put('/:id/logout', controller.logout);

module.exports = router;
