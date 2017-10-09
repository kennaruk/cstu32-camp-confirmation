var express = require('express');
var router = express.Router();
var sheets = require('../main.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client/page1.ejs', {alert: false});
});

router.post('/getInformation', function(req, res, next) {
  var key = req.body.key;

  sheets.getInformation(key, (err, row) => {
    if(err) {
      res.render('client/page1.ejs', {alert: true});
    }
    else if(row[6] !== "SPACE")
     res.render('client/page3.ejs', {code: row[6]});   
    else {
      var payload = {
        name: row[2],
        nickname: row[3],
        size: row[4],
        allegic: row[5],
        index: row[row.length-1]
      }

      res.render('client/page2.ejs', {payload: payload});
    }

  });


});
var getId = (callback) => {
  var crypto = require("crypto");
  var id = crypto.randomBytes(2).toString('hex');
  id = id.toLocaleLowerCase();

  callback(id);
}

router.post('/getId', function(req, res, next) {
  var index = parseInt(req.body.index);

  getId((id) => {
    sheets.updateCode(id, index, (err) => {
      if(err)
        res.send("เกิดเหตุขัดข้อง! รบกวนติดต่อฝ่ายทะเบียนหน้างาน");
      else
        res.render('client/page3.ejs', {code: id});
    });
  }); 
  
});

module.exports = router;
