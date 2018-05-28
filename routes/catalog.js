var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/:book_id', function (req, res, next) {
  res.redirect(`/book_profile/${req.params.book_id}`);
});


router.get('/', function (req, res, next) {

  const queryStatement = `SELECT * FROM book_info; `;
  const queryStatement2 = `SELECT * FROM categories; `;

  db.query(queryStatement, (error, result) => {

    if (result === null || result === undefined || result.length === 0) {

      res.send("Nie znaleziono książek w bazie")

    } else {

      db.query(queryStatement2, (error, result2) => {
        if (result2 === null || result2 === undefined || result2.length === 0) {

          res.send("Nie znaleziono kategorii w bazie")

        }  if (req.user) {
          const queryStatement3 = `SELECT * FROM users natural join book_status natural join books natural join book_info WHERE idusers = "${req.user[0].idusers}"; `;            
          db.query(queryStatement3, (error, result3) => { 

              if (result3 === null || result3 === undefined || result3.length === 0) {
                  // console.log(JSON.stringify(result2[0], null, 2));
                  const message = "Nie znaleziono żadnych książek w biblioteczce";
                  // res.render('resource_not_found', { message: message })
                  res.render('catalog', { booksArr: result, catArr: result2, user: req.user, libraryArr:  0}) //  0 gdy książek nie ma w biblioteczce

              } else{
              
              const queryStatement4 = `SELECT * FROM book_info WHERE book_info.book_id NOT IN (SELECT idbooks FROM book_status where idusers = ${req.user[0].idusers}); `;            
              db.query(queryStatement4, (error, result4) => {
    
                  if (result4 === null || result4 === undefined || result4.length === 0) {
                      // console.log(JSON.stringify(result2[0], null, 2));
                      const message = "Nie znaleziono żadnych książek w biblioteczce";
                      // res.render('resource_not_found', { message: message })
                      res.render('catalog', { booksArr: result, catArr: result2, user: req.user, libraryArr:  0, not_librarayArr: result4}) //  0 gdy książek nie ma w biblioteczce
    
                  }
                  else{
                     res.render('catalog', { booksArr: result, catArr: result2, user: req.user, libraryArr: result3, not_librarayArr: result4 })
                  }
                })
                }
        
            })
          }
        })
      }
})
});

module.exports = router;