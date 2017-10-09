var express = require('express');
var router = express.Router();
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
});


module.exports = router;
