var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/:series_id/:series_name', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info WHERE series_id = ${req.params.series_id} ORDER BY vol_in_series; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek z takiej serii w bazie")

    } else {
      res.render('series', { booksArr: result, series: req.params.series_name, user: req.user })
    }
  })
});

module.exports = router;
