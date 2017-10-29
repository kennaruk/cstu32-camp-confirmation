var express = require('express');
var router = express.Router();
var sheets = require('../main.js');
const YEAR_INDEX = 0,
  ID_INDEX = 1,
  NAME_INDEX = 2,
  NICKNAME_INDEX = 3,
  SIZE_INDEX = 4,
  ALLERGIC_INDEX = 5,
  CODE_INDEX = 6,
  PAYMENT_INDEX = 7,
  SHIRT_INDEX = 8,
  GROUP_INDEX = 9,
  CAR_INDEX = 10,
  ROW_INDEX = 13;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client/page1.ejs');
});

router.post('/information', function(req, res, next) {
  var id = req.body.id;
  
  sheets.getInformation(id, (err, row) => {
    if(err) {
      res.send({found: false, msg: "didn't find any id from sheets."});
    } else {
      res.send({found: true, msg: "id found."});
    }
  });

});

router.get('/:id/information', function(req, res, next) {
  var id = req.params.id;
  
  sheets.getInformation(id, (err, row) => {
    if(err) {
      res.redirect('/');
    } else {
      var payload = {
        year: row[YEAR_INDEX],
        id: row[ID_INDEX],
        name: row[NAME_INDEX],
        nickname: row[NICKNAME_INDEX],
        size: row[SIZE_INDEX],
        allegic: row[ALLERGIC_INDEX],
        code: row[CODE_INDEX],
        pay: row[PAYMENT_INDEX],
        group: row[GROUP_INDEX],
        shirt: row[SHIRT_INDEX],
        group: row[GROUP_INDEX],
        car: row[CAR_INDEX],
        index: row[ROW_INDEX]
      }
      
      res.render('client/page2.ejs', {payload: payload});
    }
  });

});

var genCode = (callback) => {
  var crypto = require("crypto");
  var code = crypto.randomBytes(2).toString('hex'); //XXXX
  code = code.toLocaleLowerCase();

  callback(code);
}

router.post('/gencode', function(req, res, next) {
  var index = parseInt(req.body.index);

  genCode(code => {
    sheets.updateCode(code, index, (err) => {
      if(err)
        res.render('client/bottom-row.ejs', {payload: {code: "SPACE"}});
      else
        res.render('client/bottom-row.ejs', {payload: {code: code}});
    });
  });

});

module.exports = router;
