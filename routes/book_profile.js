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
            res.render('page_not_found', { user: req.user })
        } else {
            console.log(JSON.stringify(result[0], null, 2));

            if (req.user) {
                const queryStatement3 = `SELECT * FROM book_status WHERE idbooks = ${req.params.book_id} AND idusers = ${req.user[0].idusers}; `;
                db.query(queryStatement3, (error, result3) => {

                    if (result3 === null || result3 === undefined || result3.length === 0) {
                        // console.log(JSON.stringify(result2[0], null, 2));
                        const message = "Nie znaleziono statusu  w bazie";
                        // res.render('resource_not_found', { message: message })
                        res.render('book_profile', { book: result[0], user: req.user[0], mark: 10, status: 0 }) // mark 10 gdy oceny nie ma, status 0 gdy ksiązki nie ma w biblioteczce

                    } else {
                        const queryStatement2 = `SELECT * FROM book_marks WHERE idbooks = ${req.params.book_id} AND idusers = ${req.user[0].idusers}; `;
                        db.query(queryStatement2, (error, result2) => {

                            if (result2 === null || result2 === undefined || result2.length === 0) {
                                // console.log(JSON.stringify(result2[0], null, 2));
                                const message = "Nie znaleziono oceny  w bazie";
                                // res.render('resource_not_found', { message: message })
                                res.render('book_profile', { book: result[0], user: req.user[0], mark: 10, status: result3[0].idstatus })

                            } else {
                                console.log("\nOK  ZALOGOWANY\n");
                                res.render('book_profile', { book: result[0], user: req.user[0], mark: result2[0].idmarks, status: result3[0].idstatus })
                            }

                        })
                    }

                })


            } else {
                console.log("\nX  NIEZALOGOWANY\n");
                res.render('book_profile', { book: result[0], user: null })
            }
        }
    })
});

router.post('/rate_book/:book_id/user/:user_id', (req, res, next) => {

    const mark = parseInt(req.body.mark) + 1;
    const queryStatement1 = `DELETE FROM book_marks WHERE idusers = ${req.params.user_id} AND idbooks = ${req.params.book_id}`;

    const queryStatement = `INSERT INTO book_marks (idbooks, idmarks, idusers)
    VALUES ( ${req.params.book_id}, ${mark}, ${req.params.user_id} )`;

    console.log("queryStatement\n", queryStatement);
    db.query(queryStatement1, (error2, result2) => {
        if (error2) {
            console.log("error ocurred", error2);
            res.send(JSON.stringify({
                "code": 400,
                "failed": "error ocurred"
            }, null, 2))
        } else {
            console.log(`Usunięto ${req.params.book_id} przez usera ${req.params.user_id}`);
            db.query(queryStatement, (error, result) => {

                if (error) {
                    console.log("error ocurred", error);
                    res.send(JSON.stringify({
                        "code": 400,
                        "failed": "error ocurred"
                    }, null, 2))
                } else {
                    console.log(`Oceniono książkę ${req.params.book_id} przez usera ${req.params.user_id} na ${mark}`);
                    res.redirect(`/book_profile/${req.params.book_id}/${mark}`)
                }
            })
        }
    })
});

router.post('/add_to_read/:book_id', function (req, res, next) {


    var book_st = {
        "idbooks": req.params.book_id,
        "idusers": req.user[0].idusers,
        "idstatus": 2
    };

    var books_to_read = `SELECT COUNT(*) as count FROM book_status WHERE idbooks= ${req.params.book_id} AND idstatus=2`;
    var read_books = `SELECT COUNT(*) as count FROM book_status WHERE idbooks= ${req.params.book_id} AND idstatus=1`;

    db.query(read_books, function (err, result) {
        var read = result[0].count;
        db.query(books_to_read, function (err, result1) {
            var to_read = result1[0].count;

            if (read === 0 && to_read === 0) {
                db.query(`INSERT into book_status SET ?`, book_st, function (err) {
                    if (err) {
                        res.send({
                            "code": 400,
                            "failed": "could not add to library"
                        })
                    } else {
                        if (to_read > 0) {
                            db.query(`DELETE from book_status WHERE idbooks=${req.params.book_id} AND idstatus=2`), function (err) {
                                if (err) {
                                    res.send({
                                        "code": 400,
                                        "failed": "could not delete from library"
                                    })
                                } else {
                                    res.redirect(`/catalog/${req.params.book_id}`)
                                }
                            };

                            res.redirect(`/catalog/${req.params.book_id}`)
                        } else {
                            res.redirect(`/catalog/${req.params.book_id}`)
                        }
                    }
                });
            } else {
                res.redirect(`/catalog/${req.params.book_id}`)
            }
        });
    });
});


router.post('/add_to_read/remove/:book_id', function (req, res, next) {

    const query = `DELETE from book_status WHERE idbooks=${req.params.book_id} AND idstatus=2 AND idusers=${req.user[0].idusers};`;

    db.query(query, function (err) {
        if (err) {
            res.send({
                "code": 400,
                "failed": "could not delete from library"
            })
        } else {
            res.redirect(`/catalog/${req.params.book_id}`)
        }
    })

});


router.post('/read/remove/:book_id', function (req, res, next) {

    const query = `DELETE from book_status WHERE idbooks=${req.params.book_id} AND idstatus=1 AND idusers=${req.user[0].idusers};`;

    db.query(query, function (err) {
        if (err) {
            res.send({
                "code": 400,
                "failed": "could not delete from library"
            })
        } else {
            res.redirect(`/catalog/${req.params.book_id}`)
        }
    })

});

router.post('/read/:book_id', function (req, res, next) {


    var book_st = {
        "idbooks": req.params.book_id,
        "idusers": req.user[0].idusers,
        "idstatus": 1
    };

    var books_to_read = `SELECT COUNT(*) as count FROM book_status WHERE idbooks= ${req.params.book_id} AND idstatus=2`;
    var read_books = `SELECT COUNT(*) as count FROM book_status WHERE idbooks= ${req.params.book_id} AND idstatus=1`;

    db.query(read_books, function (err, result) {
        var read = result[0].count;
        db.query(books_to_read, function (err, result1) {
            var to_read = result1[0].count;
            if (read === 0) {
                db.query(`INSERT into book_status SET ?`, book_st, function (err, rows) {
                    if (err) {
                        res.send({
                            "code": 400,
                            "failed": "could not add to library"
                        })
                    } else if (to_read > 0) {
                        db.query(`DELETE from book_status WHERE idbooks=${req.params.book_id} AND idstatus=2`), function (err) {
                            if (err) {
                                res.send({
                                    "code": 400,
                                    "failed": "could not delete from library"
                                })
                            } else {
                                res.redirect(`/catalog/${req.params.book_id}`)
                            }
                        };

                        res.redirect(`/catalog/${req.params.book_id}`)
                    } else {
                        res.redirect(`/catalog/${req.params.book_id}`)
                    }
                });
            } else {
                res.redirect(`/catalog/${req.params.book_id}`)
            }
        });
    });
});

module.exports = router;