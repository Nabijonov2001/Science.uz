const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { PORT } = require('./config');


const app = express();

// database connection
require('./modules/mongoose')

// all routes
fs.readdir(path.join(__dirname, 'routes'), (err, files)=>{
    files.forEach(file => {
        const RouterPath = path.join(__dirname, 'routes', file);
        const Router = require(RouterPath);
        if(Router.router && Router.path){
           app.use(Router.path, Router.router);
        }
       
    });
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload())
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Server Port
app.listen(PORT, ()=>{
  console.log(`SERVER IS LISTENIG ON PORT ${PORT}`)
})
