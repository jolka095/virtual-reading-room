var express = require('express');
var router = express.Router();
const db = require('../db');


router.get('/:what', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info ORDER BY avg_mark DESC LIMIT 4; `;
 
  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek w bazie")

    } 
    else {
       // console.log(JSON.stringify(result, null, 2))
      res.render('no_results', { booksArr: result, what: req.params.what})
    }
  })
})
module.exports = router;