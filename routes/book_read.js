var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var filePath = "/src/HP$.epub";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;
