const express = require('express');
const auth = require('../authentication/middleware');
const router = express.Router();

router.get('/', auth(), function (req, res) {
  res.render('library', { user: req.user });
});

module.exports = router;
