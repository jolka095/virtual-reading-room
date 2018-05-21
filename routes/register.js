var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
  res.render('register', {  });
});
router.get('/login', function(req, res, next) {
  res.render('login', {  });
});

router.post('/', (req, res) => {

    var user = {
      "email":req.body.email,
      "username":req.body.username,
      "password":req.body.password
    };

    db.query(`INSERT into users SET ?`, user , function (err, rows, fields) {
        if (err) {
            console.log("error ocurred",err);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            res.send({
                "code":200,
                "success":"user registered sucessfully"
            });
        }
    })
});

module.exports = router;
