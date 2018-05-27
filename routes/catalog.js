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
<<<<<<< Updated upstream

        } else {
          // console.log(JSON.stringify(result, null, 2))
          res.render('catalog', { booksArr: result, catArr: result2, user: req.user })
        }
      })
    }
  })
})
=======
  
          } else {
            // console.log(JSON.stringify(result, null, 2))
            res.render('catalog', { booksArr: result, catArr: result2})
          }
        })
      }
    })
  });
>>>>>>> Stashed changes

module.exports = router;