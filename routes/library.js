const express = require('express');
const auth = require('../authentication/middleware');
const db = require('../db');
const router = express.Router();

<<<<<<< Updated upstream
router.get('/', auth(), function (req, res) {
  res.render('library', { user: req.user });
=======

router.get('/', auth(), function(req, res) {

    const queryStatement = `SELECT * FROM users natural join book_status natural join books WHERE idusers = "${req.user[0].idusers}";; `;

    db.query(queryStatement, (error, result) => {

        if (result === null || result === undefined || result.length === 0) {

            res.render('user-profile', { userData: req.user[0] })

        }  else {
            res.render('library', { booksArr: result})
        }
    })
>>>>>>> Stashed changes
});

module.exports = router;
