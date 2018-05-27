var express = require('express');
var router = express.Router();
const db = require('../db');


router.get('/', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info LIMIT 4; `;
  const queryStatement2 = `SELECT * FROM categories; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek w bazie")

    } else {

      db.query(queryStatement2, (error, result2) => {
        if (result2 === null || result2 === undefined || result2.length === 0) {
          res.send("Nie znaleziono kategorii w bazie")
        } else {
          // console.log(JSON.stringify(result, null, 2))
          res.render('books', { booksArr: result, catArr: result2, user: req.user })
        }
      })
    }
  })
})

module.exports = router;