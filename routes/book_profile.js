var express = require('express');
var router = express.Router();
const db = require('../db')

// empty profile
router.get('/', (req, res, next) => {
    res.redirect('/');
});


router.get('/:book_id', (req, res, next) => {

    const queryStatement = `SELECT * FROM book_info WHERE book_id = ${req.params.book_id}; `;

    db.query(queryStatement, (error, result) => {

        if (result === null || result === undefined || result.length === 0) {
            console.log(JSON.stringify(result[0], null, 2));
            const message = "Nie znaleziono takiej ksiażki w bazie";
            // res.render('resource_not_found', { message: message })
            res.render('page_not_found')
        } else {
            console.log(JSON.stringify(result[0], null, 2));
            res.render('book_profile', { book: result[0] })
        }
    })
})

module.exports = router;