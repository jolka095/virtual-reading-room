var express = require('express');
var router = express.Router();
const auth = require('../authentication/middleware');
const db = require('../db');

// empty profile
router.get('/', (req, res, next) => {
    res.redirect('/');
});


router.get('/:book_id', (req, res, next) => {

    const queryStatement = `SELECT * FROM book_info WHERE book_id = ${req.params.book_id}; `;

    db.query(queryStatement, (error, result) => {

        if (result === null || result === undefined || result.length === 0) {
            //   console.log(JSON.stringify(result[0], null, 2));
            const message = "Nie znaleziono takiej ksiażki w bazie";
            // res.render('resource_not_found', { message: message })
            res.render('page_not_found')
        } else {
            console.log(JSON.stringify(result[0], null, 2));

            if (req.user) {
                console.log("\nOK  ZALOGOWANY\n")
                res.render('book_profile', { book: result[0], user: req.user[0] })
            } else {
                console.log("\nX  NIEZALOGOWANY\n")
                res.render('book_profile', { book: result[0], user: null })
            }


        }
    })
});

router.post('/rate_book/:book_id/user/:user_id', (req, res, next) => {

    const mark = parseInt(req.body.mark) + 1
    const queryStatement = ` INSERT INTO book_marks (idbooks, idmarks, idusers)
    VALUES ( ${req.params.book_id}, ${mark}, ${req.params.user_id} )`;

    // console.log("queryStatement\n", queryStatement)

    db.query(queryStatement, (error, result) => {

        if (error) {
            console.log("error ocurred", error);
            res.send(JSON.stringify({
                "code": 400,
                "failed": "error ocurred"
            }, null, 2))
        } else {
            res.redirect(`/catalog/${req.params.book_id}`)
        }

    })
});

module.exports = router;