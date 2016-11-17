var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());

var path = require('path');


//http://stackoverflow.com/questions/25332561/node-js-express-large-body-for-bodyparser
//app.use(bodyparser.json({limit: '50mb'}));
//app.use(bodyparser.urlencoded({limit: '50mb'}));
//app.use(bodyparser.raw({limit: '50mb'}));

// //Set Request Size Limit
// app.use(express.limit(100000000));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use(bodyparser.urlencoded({
    extended: true,
    limit: 1024 * 1024 * 20
}));
app.use(bodyparser.json({ limit: 1024 * 1024 * 20 }));

// var jsonParser = bodyparser.json({
//     limit: 1024 * 1024 * 20
//     type: 'application/json'
// });
// var urlencodedParser = bodyparser.urlencoded({
//     extended: true,
//     limit: 1024 * 1024 * 20
//     //type: 'application/x-www-form-urlencoding'
// });
//
//
// app.use(jsonParser);
// app.use(urlencodedParser);

//URL位置
var index = require('./routes/index');
//var users  = require('./routes/users');
var account = require('./routes/account');
var profile = require('./routes/profile');
var note = require('./routes/note');
var photo = require('./routes/photo'); //--------add on 161027
var cool = require('cool-ascii-faces');
var mail = require('./routes/mail'); //---------add on 161030
var member = require('./routes/member'); //---------add on 161107
var calendar = require('./routes/calendar'); //---------add on 161110
var file = require('./routes/file'); //---------add on 161117
//var public = require('./routes/public'); //---------add on 161117

//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);
app.use('/account', account);
app.use('/profile', profile);
app.use('/note', note);
app.use('/photo', photo); //--------add on 161027
app.use('/mail', mail); //---------add on 161030
app.use('/member', member); //---------add on 161107
app.use('/calendar', calendar); //---------add on 161110
app.use('/file', file); //---------add on 161117

//http://stackoverflow.com/questions/24433733/learning-node-express-public-folder-not-working
app.use("/public", express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(err, req, res, next) {

    console.log('-------catch 404---------');
    res.status(404);
    //next(err);
    //console.log(next(err));
    //res.render('error', {err: err});
    console.log(err);
    res.end();
    console.log('-------end catch 404---------');

});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {

    console.log('-------error handler---------');
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
    console.log('-------end handler---------');
});

//console.log('hihi');

module.exports = app;
