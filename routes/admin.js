var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const user = {
  username: 'test-user',
  password: 'test',
} 

function checkuser(username,password){
  if(user.username.includes(username) && user.password.includes(password)){
    return false;
  }
    return true; 
}
/* GET users listing. */
router.get('/', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  passport.use(new LocalStrategy((username, password, ) => {
    //username is admin
    if(checkuser(username,password)){
        res.render("Id is Admin || Page Admin");
    }else{
        res.render("Id is not admin");      
    }

  }
))
  res.send('respond with a resource');
=======
 
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
>>>>>>> master
});


module.exports = router;
