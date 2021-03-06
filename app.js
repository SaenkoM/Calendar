var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var calendar = require('./routes/calendar');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("1234567890QWERTY"));
app.use(express.static(path.join(__dirname, 'public')));

//session----------------------------------------------------
const session = require('express-session');
const MemoryStore = session.MemoryStore;
app.use(session({
  name : 'app.sid',
  secret: "1234567890QWERTY",
  resave: true,
  store: new MemoryStore(),
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

//db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calendar_737', { useMongoClient: true });

app.use('/', index);
app.use('/calendar', calendar);

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
