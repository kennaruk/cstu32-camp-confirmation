var express = require('express');
var router = express.Router();
var session = require('express-session');

const user1 = {
  username: 'Admin1',
  password: 'cstu32admin1',
} 

const user2 = {
  username: 'Admin2',
  password: 'cstu32admin2',
} 

router.use(session({
    secret: 'CSTU32',
    resave: true,
    saveUninitialized: true
}));


function checkuser(username,password){
  if((user1.username.includes(username) && user1.password.includes(password) )||
  (user2.username.includes(username) && user2.password.includes(password)) ){
    return true;
  }
    return false; 
}
 
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session.admin)
    return next();
  else
    return res.redirect('/');
};
 
router.get('/', auth, function(req, res, next) {
  res.render('admin/confimation.ejs');
});

router.get('/notLogin', function(req, res, next) {
  res.render('admin/form-login.ejs');
});

router.post('/', function(req, res, next) {

  username = req.body.username;
  password = req.body.password;

 if (!username || !password) {
   //TODO:error plz edit
      res.redirect('/notLogin');
  } else {
    //check username password admin
    if(checkuser(username,password)){
      req.session.admin = true;
      res.redirect('/');
    }
  }
});

// Logout endpoint
router.get('/logout', function (req, res) {
  req.session.destroy();

});

router.get('/code', auth,function(req,res,next){
  res.render('admin/confimation.ejs');
});

router.get('/notPay', auth,function(req,res,next){
  res.render('admin/person_detail.ejs');
});

router.get('/pay', auth,function(req,res,next){
  res.render('admin/success_person.ejs');
});


module.exports = router;
