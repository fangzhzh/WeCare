var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wecare');
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var passport = require('passport');
var sleep = require('./routes/sleep');
var article = require('./routes/article');
var activity = require('./routes/activity');
var recipe = require('./routes/recipe');
var jobs = require('./jobs/jobs');
var Agenda = require('agenda');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/sleep', sleep);
app.use('/login', login);
app.use('/signup', signup);
app.use('/article', article);
app.use('/activity', activity);
app.use('/recipe', recipe);
jobs.makeRecipe("fangzhzh@gmail.com");

var agenda = new Agenda({db: {address: "mongodb://localhost/wecare"}});
agenda.define('fetch data', function(job, done) {
  console.log(1);
  // jobs.fetchGoogleFit("fangzhzh@gmail.com");
  done(); /// <------- MUST!!!
});

agenda.define('make recipe', function (job, done) {
  console.log(2);
  // jobs.makeRecipe("fangzhzh@gmail.com");
  done(); /// <------- MUST!!!
});

agenda.on('ready', function() {
  agenda.every('5 seconds', 'fetch data');
  agenda.every('10 seconds', 'make recipe');
  agenda.start();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
