var express = require('express');
var router = express.Router();

router.get('/:book_id', function(req, res, next) {
    if(req.user){
        res.render('book_read');
    } else {
        res.render('policy');
    }

});

module.exports = router;
