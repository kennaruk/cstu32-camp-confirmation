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
  if((user1.username === username && user1.password === password )||
  (user2.username === username && user2.password === password )){
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

router.get('/info',auth, function(req,res,next){
  res.render('admin/Admin3.ejs');
});

router.get('/info-red',auth, function(req,res,next){
  res.render('admin/Admin4.ejs');
});

router.get('/success/:index', auth, function(req,res,next){
  var index = parseInt(req.params.index);
  sheets.getDataByIndex(index, (err, data) => {
    if(err){
      res.redirect('/admin/confirm');
    } else {
       var payload = {
        name: data[2],
        nickname: data[3],
      }

      // console.log(data);
      res.render('admin/Admin5.ejs',{payload : payload});
  }});
});

router.post('/login', function(req, res, next) {

 var username = req.body.username;
 var password = req.body.password;

 if (!username || !password) {
   //TODO:error plz edit
      res.redirect('/admin');
  } else {
    //check username password admin
    if(checkuser(username,password)){
      req.session.admin = true;
      res.redirect('/admin/confirm');
    }else{
      res.redirect('/admin');
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
        index: data[data.length-1]
      }
        if(data[8]==='รับเสื้อแล้ว'){
          res.redirect('/admin/success/'+payload.index);
        }else{
          res.render('admin/Admin3.ejs', {payload: payload });
        }      
    }
  })
});

router.post('/info-shirt', function(req, res, next) {
   var index = parseInt(req.body.index);
    sheets.updateShirtByIndex(index, (err, data) => {
    if(err){
      res.send('0');
    } else {   
      res.send('shirt okay');
    }
  })
})

router.post('/info-money', function(req, res, next) {
   var index = parseInt(req.body.index);
    sheets.updateMoneyByIndex(index, (err, data) => {
    if(err){
      res.send('0');
    }
     res.send('money okay');
  })
  
})

// Logout endpoint
router.post('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/admin/');
});

module.exports = router;
