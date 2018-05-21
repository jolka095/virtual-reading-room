var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/:book_id', function (req, res, next) {
  res.redirect(`/book_profile/${req.params.book_id}`);
});

router.get('/category/:category_id', function (req, res, next) {

  const queryStatement = `SELECT * FROM books WHERE idcategories = ${req.params.category_id}; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {
      
      res.send("Nie znaleziono książek z takiej kategorii w bazie")
      // res.render('resource_not_found', { message: message })
    } 
    else {
      res.render('books', { booksArr: result })
    }
  })
});

router.get('/authors/:author_id', function (req, res, next) {

  const queryStatement = `SELECT * FROM books WHERE idauthor = ${req.params.author_id}; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek takiego autora w bazie")
      
    } else {
      res.render('books', { booksArr: result })
    }
  })
});

router.get('/series/:series_id', function (req, res, next) {

  const queryStatement = `SELECT * FROM books WHERE idseries = ${req.params.series_id}; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek z takiej serii w bazie")

    } else {
      res.render('books', { booksArr: result })
    }
  })
});


router.get('/', function (req, res, next) {

  const queryStatement = `SELECT * FROM books; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek w bazie")

    } else {
      console.log(JSON.stringify(result, null, 2))
      res.render('books', { booksArr: result })
    }
  })
});

module.exports = router;