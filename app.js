var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var passwordHelpRouter = require('./routes/password-help');
var booksRouter = require('./routes/books');
var bookProfileRouter = require('./routes/book_profile');
var libraryRouter = require('./routes/library');
var contact = require('./routes/contact');
var termsOfUse = require('./routes/terms-of-use');
var policy = require('./routes/policy');
var userProfile = require('./routes/user-profile');
var series = require('./routes/series');

var app = express();
const db = require('./db');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/password-help', passwordHelpRouter);
app.use('/books', booksRouter);
app.use('/book_profile', bookProfileRouter);
app.use('/library', libraryRouter);
app.use('/contact', contact);
app.use('/termsofuse', termsOfUse);
app.use('/policy', policy);
app.use('/user-profile', userProfile);
app.use('/series', series);

// page not found
app.get('*', function(req, res){
  res.render('page_not_found')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
