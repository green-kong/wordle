const express = require('express');

const userController = require('./user.controller.js');

const router = express.Router();

router.post('/login', userController.login);

router.post('/score', userController.score);

module.exports = router;
