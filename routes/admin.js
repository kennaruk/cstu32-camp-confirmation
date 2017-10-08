var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  // console.log('req: ', req);
  res.render('admin/index.ejs');
});

router.get('/code',function(req,res,next){
  res.render('admin/confimation.ejs');
});

router.get('/login',function(req,res,next){
  res.render('admin/form-login.ejs');
});

router.get('/person',function(req,res,next){
  res.render('admin/person_detail.ejs');
});
router.get('/succress',function(req,res,next){
  res.render('admin/succress_person.ejs');
});

module.exports = router;
