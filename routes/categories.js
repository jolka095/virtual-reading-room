var express = require('express');
var router = express.Router();
const db = require('../db');


router.get('/:category_id/:category_name', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info WHERE category_id = ${req.params.category_id}; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {
      
      res.send("Nie znaleziono książek z takiej kategorii w bazie")
      // res.render('resource_not_found', { message: message })
    } 
    else {
      res.render('categories', { booksArr: result, cat: req.params.category_name})
    }
  })
});



module.exports = router;