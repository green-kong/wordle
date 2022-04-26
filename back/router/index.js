const express = require('express');
const authRouter = require('./auth/authRouter.js');
const userRouter = require('./user/userRouter.js');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/user', userRouter);

module.exports = router;
