var express = require('express');
var router = express.Router();

/* GET users listing. */
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
    return res.redirect('/admin/');
};

router.get('/',function(req,res,next){
  res.render('admin/Admin1.ejs');
});

router.get('/confirm', auth, function(req,res,next){
  res.render('admin/Admin2.ejs');
});

router.get('/info', auth, function(req,res,next){
  res.render('admin/Admin3.ejs');
});

router.get('/info-red', auth, function(req,res,next){
  res.render('admin/Admin4.ejs');
});

router.get('/success', auth, function(req,res,next){
  res.render('admin/Admin5.ejs');
});

router.post('/login', function(req, res, next) {

  username = req.body.username;
  password = req.body.password;

 if (!username || !password) {
   //TODO:error plz edit
      res.redirect('/');
  } else {
    //check username password admin
    if(checkuser(username,password)){
      req.session.admin = true;
      res.redirect('/admin/confirm');
    }
  }
});

// Logout endpoint
router.post('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/admin/');
});

module.exports = router;
