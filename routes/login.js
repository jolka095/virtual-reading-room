var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
  res.render('login', {  });
});

router.post('/', (req, res) => {

    const sql=`SELECT username FROM users WHERE email = ${req.body.email} and password = ${req.body.password};`;

    db.query(sql, function(err, results){
        res.redirect('/user-profile');
    });
});

module.exports = router;
