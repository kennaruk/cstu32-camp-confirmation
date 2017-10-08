var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  // console.log('req: ', req);
  res.render('admin/index.ejs');
});

router.get('/code',function(req,res,next){
  res.render('admin/confimation.ejs');
});

router.get('/form',function(req,res,next){
  res.render('admin/form-login.ejs');
});



module.exports = router;
