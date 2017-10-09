var express = require('express');
var router = express.Router();
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/confimation.ejs');
});

router.get('/notLogin', function(req, res, next) {
  res.render('admin/form-login.ejs');
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  res.redirect('/');
});

router.get('/code',function(req,res,next){
  res.render('admin/confimation.ejs');
});

router.get('/notPay',function(req,res,next){
  res.render('admin/person_detail.ejs');
});

router.get('/pay',function(req,res,next){
  res.render('admin/success_person.ejs');
});

module.exports = router;
