/* eslint-disable linebreak-style */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var transactionsRouter = require('./routes/transactions');
let usersrouter = require('./routes/users');
let mysql = require('mysql');
var app = express();
let cors = require('cors');
let dbConfig = require('./config/default.json'); 
try { 
    dbConfig = require('./config/development.json');
    console.log('Database configuration: development');
} 
catch (e) { 
    console.log('Database configuration: default'); 
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
    res.locals.connection = mysql.createConnection(dbConfig);
    res.locals.connection.connect();
    next();
});
app.use('/', indexRouter);
app.use('/transactions', transactionsRouter);
app.use('/users', usersrouter);

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
