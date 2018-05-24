var express = require('express');
var router = express.Router();
const db = require('../db');

// finding books version 1
router.post('/find', (req, res) => {

  let id = 0;
  let item = req.body.find_item;

  db.query(`SELECT book_id FROM book_info WHERE title="${item}"`, function (err, rows, fields) {

    if (typeof rows !== 'undefined' && rows.length > 0) {
      id = rows[0].book_id;
      // console.log('id : ', id)
      res.redirect(`/books/${id}`);
    }
    else {
      console.log("\nSzukam dalej po autorze...");
      db.query(`SELECT author_id FROM book_info WHERE author="${item}"`, function (err, rows, fields) {

        if (typeof rows !== 'undefined' && rows.length > 0) {
          id = rows[0].author_id;
          // console.log('id : ', id)
          res.redirect(`/books/authors/${id}`);
        }
        else {
          console.log("\nSzukam dalej po kategorii...");
          db.query(`SELECT category_id FROM book_info WHERE category="${item}"`, function (err, rows, fields) {

            if (typeof rows !== 'undefined' && rows.length > 0) {
              id = rows[0].category_id;
              // console.log('id : ', id)
              res.redirect(`/books/category/${id}`);
            }
             else {
              console.log("\nSzukam dalej po serii...");
              db.query(`SELECT series_id FROM book_info WHERE series="${item}"`, function (err, rows, fields) {

                if (typeof rows !== 'undefined' && rows.length > 0) {
                  id = rows[0].series_id;
                  // console.log('id : ', id)
                  res.redirect(`/books/series/${id}`);
                }
                else {
                  console.log("\nBrak wyników...");
                  res.send(`Brak wyników dla frazy ${item}`);
                }
              })
             }
          })
        }
      })
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
    // console.log(JSON.stringify(result, null, 2))
    res.render('index', { booksArr: result })
    }
    
  })
});

module.exports = router;
