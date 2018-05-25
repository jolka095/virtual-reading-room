var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/:book_id', function (req, res, next) {
  res.redirect(`/book_profile/${req.params.book_id}`);
});

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


router.get('/category/:category_id', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info WHERE category_id = ${req.params.category_id}; `;

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

  const queryStatement = `SELECT * FROM book_info WHERE author_id = ${req.params.author_id} order by author_id, vol_in_series; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek takiego autora w bazie")
      
    } else {
      res.render('books', { booksArr: result })
    }
  })
});

router.get('/series/:series_id', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info WHERE series_id = ${req.params.series_id} ORDER BY vol_in_series; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek z takiej serii w bazie")

    } else {
      res.render('books', { booksArr: result })
    }
  })
});


router.get('/', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info LIMIT 4; `;
  const queryStatement2 = `SELECT * FROM categories; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek w bazie")

    }  else {
      
      db.query(queryStatement2, (error, result2) => {
        if (result2 === null || result2 === undefined || result2.length === 0) {

        res.send("Nie znaleziono kategorii w bazie")

        } else {
          // console.log(JSON.stringify(result, null, 2))
          res.render('books', { booksArr: result, catArr: result2})
        }
      })
    }
  })
})

module.exports = router;