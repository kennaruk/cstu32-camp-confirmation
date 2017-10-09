var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var client = require('./routes/client');
var admin = require('./routes/admin');

var app = express();
// var test = require('./query.js');
// test.func();
// view engine setup
// var test = require('./main.js');
// test.getCodeByIndex(126, (err, row) => {
//   console.log('row test: ', row);
// });
// test.getInformation('5609610349', (err, data) => {
//   if(data !== null)
//     console.log(data);
//   else
//     console.log(err);
// });

// test.updateCode('genCode', 12, (err) => {
//   if(err) 
//     console.log('err!!');
//   else
//     console.log('pass!!');
// });

// test.getInformation('นิติพัฒน์ วุฒิศศิวัฒน์', (err, data) => {
//   if(data !== null)
//     console.log(data);
//   else
//     console.log(err);
// });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', client);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
