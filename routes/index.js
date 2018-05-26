var express = require('express');
var router = express.Router();
const auth = require('../authentication/middleware');
const db = require('../db');

// finding books version 2
router.post('/find', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));

  let item = req.body.find_item;
  let search_for = req.body.search_for;

  let sql_condition = '';
  let sql_condition_array = [];
  let sql_query = '';

  if (search_for !== undefined && search_for !== null) {

    if (Array.isArray(search_for)) {

      for (let i = 0; i < search_for.length; i++) {
        sql_condition += ` ${req.body.search_condition[i]} ${search_for[i]} LIKE "%${item[i]}%" `;
        console.log(sql_condition)
      }

    } else {
      sql_condition = `${search_for} LIKE "%${item}%"`
    }

  } else {
    sql_condition = `title LIKE "%${item}%" OR author LIKE "%${item}%" OR category LIKE "%${item}%" OR series LIKE "%${item}%"`
  }

  sql_query = `SELECT * FROM book_info WHERE ${sql_condition} ORDER BY author_id, vol_in_series;`;
  console.log(sql_query);

  db.query(sql_query, function (err, rows, fields) {
    if (typeof rows !== 'undefined' && rows.length > 0) {
      res.render('books', { booksArr: rows })
    } else {
      res.send(`Brak rezultatów wyszukiwania dla ${item}.`)
    }
  })

})

/* GET home page. */
router.get('/', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info ORDER BY avg_mark DESC LIMIT 4;`;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono żadnych kategorii w bazie")

    }
    else {

      if (req.user) {
        console.log("\nZALOGOWANY\n")
      } else {
        console.log("\n----> NIEZALOGOWANY\n")
      }
      // console.log(JSON.stringify(result, null, 2))
      res.render('index', { booksArr: result })
    }

  })
});

module.exports = router;
