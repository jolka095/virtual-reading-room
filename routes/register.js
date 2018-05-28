var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/', function (req, res, next) {
    res.render('register', { user: req.user });
});
router.get('/login', function (req, res, next) {
    res.render('login', { user: req.user });
});

router.post('/', (req, res, next) => {

    var user = {
        "email": req.body.email,
        "username": req.body.username,
        "password": req.body.password
    };

    db.query(`INSERT into users SET ?`, user, function (err) {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "user already in database"
            })
        }
    });

    db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`, function (err, result) {
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "user already in database"
            })
        } else {
            req.login(result[0], function (err) {
                if (err) { return next(err); }
                return res.redirect('/library');
            });
        }
    })
});

module.exports = router;
