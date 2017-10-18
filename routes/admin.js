var express = require('express');
var router = express.Router();
var sheets = require('../main.js');

/* GET users listing. */
var session = require('express-session');

const YEAR_INDEX = 0,
  ID_INDEX = 1,
  NAME_INDEX = 2,
  NICKNAME_INDEX = 3,
  SIZE_INDEX = 4,
  ALLERGIC_INDEX = 5,
  CODE_INDEX = 6,
  PAYMENT_INDEX = 7,
  SHIRT_INDEX = 8,
  GROUP_INDEX = 9,
  CAR_INDEX = 10,
  ROW_INDEX = 11;

router.use(session({
    secret: 'CSTU32',
    resave: true,
    saveUninitialized: true
}));

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

router.get('/:code/information',auth, function(req,res,next){
  var code = req.params.code;

    sheets.getDataByCode(code, (err, row) => {
    if(err) {
      res.redirect('/admin/confirm');
    } else {
      var payload = {
        year: row[YEAR_INDEX],
        id: row[ID_INDEX],
        name: row[NAME_INDEX],
        nickname: row[NICKNAME_INDEX],
        size: row[SIZE_INDEX],
        allegic: row[ALLERGIC_INDEX],
        code: row[CODE_INDEX],
        pay: row[PAYMENT_INDEX],
        group: row[GROUP_INDEX],
        shirt: row[SHIRT_INDEX],
        car: row[CAR_INDEX],
        index: row[ROW_INDEX],

      }
       res.render('admin/Admin3.ejs', {payload: payload});
    }
  });
});

router.post('/login', function(req, res, next) {

 var username = req.body.username;
 var password = req.body.password;

 if (!username || !password) {
   //TODO:error plz edit
      res.send({check: false, msg: "username password not pattern"});   
      // res.redirect('/admin/');
  } else {
      //check username password admin
      sheets.getDataAdmin((err, data) => {
      if(err){
        res.send({check: false, msg: " Get Username Password Admin Err"});
      }else{
        var usernameadmin = data;

        if((usernameadmin[0] === username && usernameadmin[1] === password )||
        (usernameadmin[2] === username && usernameadmin[3] === password )){
          req.session.admin = true;
          res.send({check: true, masg : "login success"});
        }else{
          res.send({check: false, msg: " login false"});
        }   
      }
    });
  }
});

router.post('/confirm',auth, function(req, res, next) {

  var code = req.body.code;
  sheets.getDataByCode(code, (err, data) => {
    if(err){
      console.log(err);
      res.send({err: true ,shirt: true,code : code ,  msg: "Get shirt already!"});      
    } else {
        var payload = {
        shirt: data[SHIRT_INDEX],
        code : data[CODE_INDEX]
      }
        if(payload.shirt ==='รับเสื้อแล้ว'){
          res.send({err: false ,shirt: true,code : code ,  msg: "Get shirt already!"});
        }else{
          res.send({err: false ,shirt: false,code : code ,  msg: "give shirt!"});        }      
    }
  })
});

router.post('/update/shirt',auth, function(req, res, next) {

   var index = parseInt(req.body.index);

    sheets.updateShirtByIndex(index, (err, data) => {
    if(err){
      res.send({ success : false ,  msg: "err shirt!"});
    } else {   
      res.send({success : true  ,  msg: "give shirt!"});
    }
  })
})

router.post('/update/money',auth, function(req, res, next) {
   var index = parseInt(req.body.index);

    sheets.updateMoneyByIndex(index, (err, data) => {
    if(err){
     res.send({success : false ,  msg: "err money!"});
    }
     res.send({success : true ,  msg: "pay money already!"});
  })
})

router.post('/update/car',auth, function(req, res, next) {
   var index = parseInt(req.body.index);
   var car = req.body.car;

    sheets.updateCarByIndex(index,car, (err, data) => {
    if(err){
      res.send({success : false ,  msg: "err car!"});
    }
      res.send({success : true  ,  msg: "car number!"});
  })
})

// Logout endpoint
router.post('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/admin/');
});

module.exports = router;
