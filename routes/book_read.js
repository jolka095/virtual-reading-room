var express = require('express');
var router = express.Router();

router.get('/:book_id', function(req, res, next) {
    res.render('book_read');
});

module.exports = router;
