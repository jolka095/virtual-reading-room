var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Użytkownicy (podstrona wygenerowana automatycznie)');
});

module.exports = router;
