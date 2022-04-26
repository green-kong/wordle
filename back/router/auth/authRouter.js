require('dotenv').config();
const express = require('express');
const passport = require('passport');

const { makeToken } = require('../../util/jwt/jwt.js');

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    session: false,
    failureRedirect: '/',
  }),
  (req, res) => {
    const { userid, userAlias } = req.user;
    const payload = { userid, userAlias };
    const token = makeToken(payload);
    res.cookie('Access_token', token, { maxAge: 1000 * 60 * 60 });
    res.redirect('http://localhost:3000/');
  }
);

module.exports = router;
