const express = require('express');
const auth = require('../authentication/middleware');
const db = require('../db');
const router = express.Router();

router.get('/', auth(), function (req, res) {

    const queryStatement = `SELECT * FROM users natural join book_status natural join books natural join book_info WHERE idusers = "${req.user[0].idusers}"; `;

    db.query(queryStatement, (error, result) => {
        
        if (result === null || result === undefined || result.length === 0) {
            res.render('library', { booksArr: null, user: req.user })
        } else {
            res.render('library', { booksArr: result, user: req.user })
        }
    })
});

module.exports = router;