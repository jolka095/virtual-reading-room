var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('user-profile', {  });
});

router.get('/user-profile', function (req, res, next) {

    const queryStatement = `SELECT username FROM users WHERE email = ${req.body.email}; `;

    db.query(queryStatement, (error, result) => {

        if (result === null || result === undefined || result.length === 0) {

            res.send("Nie znaleziono książek z takiej kategorii w bazie")
            // res.render('resource_not_found', { message: message })
        }
        else {
            res.render('user-profile', { userData: result })
        }
    })
});


module.exports = router;
