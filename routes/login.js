const express = require('express');
const router = express.Router();
const passport = require('passport');

const db = require('../db');

router.get('/', function (req, res, next) {
  res.render('login-error', { user: req.user });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/library',
    failureRedirect: '/login',
    session: true
  })
);

module.exports = router;