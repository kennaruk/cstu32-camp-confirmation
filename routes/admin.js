var express = require('express');
var router = express.Router();
var sheets = require('../main.js');


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

router.get('/info', function(req,res,next){
  res.render('admin/Admin3.ejs');
});

router.get('/info-red', function(req,res,next){
  res.render('admin/Admin4.ejs');
});

router.get('/success', auth, function(req,res,next){
  res.render('admin/Admin5.ejs');
});

router.post('/login', function(req, res, next) {

 var username = req.body.username;
 var password = req.body.password;

 if (!username || !password) {
   //TODO:error plz edit
      res.redirect('/');
  } else {
    //check username password admin
    if(checkuser(username,password)){
      req.session.admin = true;
      res.redirect('/admin/confirm');
    }else{
      res.redirect('/');
    }   
  }
});

router.post('/confirm', function(req, res, next) {

  var code = req.body.code;
  sheets.getDataByCode(code, (err, data) => {
    if(err){
      res.redirect('/admin/confirm');
    } else {
       var payload = {
        name: data[2],
        nickname: data[3],
        size: data[4],
        allegic: data[5],
        status : data[7],
        index: data[9]
      }
        res.render('admin/Admin3.ejs', {payload: payload });
     
      
    }

  })

});


// Logout endpoint
router.post('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/admin/');
});

module.exports = router;
