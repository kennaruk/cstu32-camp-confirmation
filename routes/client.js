var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client/index.ejs');
});
router.get('/getPage1', function(req, res, next) {
  res.render('client/page1.ejs');
});
router.get('/getPage2', function(req, res, next) {
  res.render('client/page2.ejs');
});router.get('/getPage3', function(req, res, next) {
  res.render('client/page3.ejs');
});


module.exports = router;
