var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('password-help', { user: req.user });
});

module.exports = router;
