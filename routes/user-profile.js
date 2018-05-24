var express = require('express');
var router = express.Router();
const db = require('../db');

// router.get('/', function(req, res, next) {
//   res.render('user-profile', {  });
// });

router.get('/', function (req, res, next) {

    const queryUser = `SELECT * FROM users WHERE email = "anna.pol@wp.pl"; `;

    db.query(queryUser, (error, result) => {

        if (result === null || result === undefined) {
            res.send("Nie znaleziono takiego użytkownika")
        }
        else {
            res.render('user-profile', { userData: result[0] })
        }
    });

});


module.exports = router;
