var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/pageAdmin1',function(req,res,next){
  res.render('admin/Admin1.ejs');
});

router.get('/pageAdmin2',function(req,res,next){
  res.render('admin/Admin2.ejs');
});

router.get('/pageAdmin3',function(req,res,next){
  res.render('admin/Admin3.ejs');
});

router.get('/pageAdmin4',function(req,res,next){
  res.render('admin/Admin4.ejs');
});

router.get('/pageAdmin5',function(req,res,next){
  res.render('admin/Admin5.ejs');
});

module.exports = router;
