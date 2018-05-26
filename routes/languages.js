var express = require('express');
var router = express.Router();
const db = require('../db');


router.get('/:language_name', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info WHERE language = "${req.params.language_name}"; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {
      
      res.send("Nie znaleziono książek w takim języku w bazie")
      // res.render('resource_not_found', { message: message })
    } 
    else {
      res.render('languages', { booksArr: result, lan: req.params.language_name} )
    }
  })
});



module.exports = router;