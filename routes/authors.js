var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/:book_id', function (req, res, next) {
  res.redirect(`/book_profile/${req.params.book_id}`);
});


router.get('/:author_id/:author_name', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info WHERE author_id = ${req.params.author_id} order by author_id, vol_in_series; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek takiego autora w bazie")
      
    } else {
      res.render('authors', { booksArr: result, author: req.params.author_name})
    }
  })
});

module.exports = router;