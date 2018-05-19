var express = require('express');
var router = express.Router();
const db = require('../db')

router.get('/', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info; `

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length == 0) {
      // console.log(JSON.stringify(result, null, 2))
      const message = "Nie znaleziono książek w bazie"
      res.send(message)
      // res.render('resource_not_found', { message: message })
      // res.render('page_not_found')
    } else {
      console.log(JSON.stringify(result, null, 2))
      res.render('books', { booksArr: result })
    }
  })
});


router.get('/category/:category_id', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info WHERE category_id = ${req.params.category_id}; `

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length == 0) {
      // console.log(JSON.stringify(result, null, 2))
      const message = "Nie znaleziono książek z takiej kategorii w bazie"
      res.send(message)
      // res.render('resource_not_found', { message: message })
      // res.render('page_not_found')
    } else {
      console.log(JSON.stringify(result, null, 2))
      res.render('books', { booksArr: result })
    }
  })
});

router.get('/authors/:author_id', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info WHERE author_id = ${req.params.author_id}; `

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length == 0) {
      // console.log(JSON.stringify(result, null, 2))
      const message = "Nie znaleziono książek takiego autora w bazie"
      res.send(message)
      // res.render('resource_not_found', { message: message })
      // res.render('page_not_found')
    } else {
      console.log(JSON.stringify(result, null, 2))
      res.render('books', { booksArr: result })
    }
  })
});

module.exports = router;