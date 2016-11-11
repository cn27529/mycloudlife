var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var sendMail = require('../mail/sendMail');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/maillog.html

//忘記密碼寄送mail
router.post('/repwd', function(req, res) {

    var email = req.body.email;
    var pwd = req.body.pwd;
    var name = req.body.name;

    var json = {
        "email": email,
        "pwd": pwd,
        "name": "",
        "msg": "post沒有電子郵件",
        "err": "repwd"
    }

    if (email === undefined) {
        json.msg = "email is undefined";
        res.json(json);
    }
    if (email == null) {
        json.msg = "email is null";
        res.json(json);
    }

    //props
    var mail_data = {
        mailFrom: 'service@mycloudedlife.com',
        mailTo: email,
        title: '忘記密碼',
        body: 'Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
        pwd: pwd,
        name: name
    }

    //mail body
    mail_data.body = 'Dear ' + mail_data.name + ',<br>Thank you for contacting us<br>This is your password: ' + mail_data.pwd + '<br>For your account security, please change your passowrd later.';
    console.log(mail_data);
    //忘記密碼寄送mail
    sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);

    json.err = "";
    json.msg = "ok,郵件己發送";
    res.json(json);

    //callback function
    function sendMailCallback(mailMsg, subject, html, from, to) {

        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

        console.log(mailMsg);
        console.log("sendMailCallback: " + now.toLocaleString());

        models.Maillog.create({
            title: subject,
            body: html,
            mailFrom: from,
            mailTo: to,
            msg: mailMsg,
            yymmdd: yy + mm + dd,
            yymm: yy + mm
        }).then(function(data) {
            console.log(data);
            console.log('models.Maillog.create');
        }).catch(function(err) {
            console.log(err);
        });


    }

});

//邀請成員寄送mail
router.post('/reqemail', function(req, res) {

    var email = req.body.email;
    //var email = req.params.email;

    var json = {
        "email": email,
        //"pwd": "",
        "msg": "post沒有電子郵件",
        "err": "reqemail"
    }

    if (email === undefined) {
        json.msg = "email is undefined";
        res.json(json);
    }
    if (email == null) {
        json.msg = "email is null";
        res.json(json);
    }

    //props
    var mail_data = {
        mailFrom: 'service@mycloudedlife.com',
        mailTo: email,
        title: '成員邀請',
        body: '<h3>測試測試</h3>'
    }

    console.log(mail_data);
    //忘記密碼寄送mail
    sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);

    json.err = "";
    json.msg = "ok,郵件己發送";
    res.json(json);

    //callback function
    function sendMailCallback(mailMsg, subject, html, from, to) {

        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

        console.log(mailMsg);
        console.log("sendMailCallback: " + now.toLocaleString());

        models.Maillog.create({
            title: subject,
            body: html,
            mailFrom: from,
            mailTo: to,
            msg: mailMsg,
            yymmdd: yy + mm + dd,
            yymm: yy + mm
        }).then(function(data) {
            console.log(data);
            console.log('models.Maillog.create');
        }).catch(function(err) {
            console.log(err);
        });

    }


});


//查寄送記錄
router.get('/yymmdd/:yymmdd', function(req, res) {

    var yymmdd = req.params.yymmdd;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Maillog.findAll({
        where: {
            yymmdd: yymmdd
        }
    }).then(function(data) {

        res.json(data);

    }).catch(function(err) {

        console.log(err);
        json.err = "sql";
        res.json(json);

    });

});

router.get('/yymm/:yymm', function(req, res) {

    var yymm = req.params.yymm;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Maillog.findAll({
        where: {
            yymm: yymm
        }
    }).then(function(data) {

        res.json(data);

    }).catch(function(err) {

        console.log(err);
        json.err = "sql";
        res.json(json);

    });

});


//all的通關密語是Q_QtaiwanQvQ
//router.get('/all/:keyword', function(req, res) {
router.get('/all', function(req, res) {

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: "沒有資料",
        err: ""
    }

    models.Maillog.findAll({

    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        if (data == null) data = cool();
        res.json(data);

    }).catch(function(err) {

        console.log(err);
        json.err = "sql";
        res.json(json);

    });

});

module.exports = router;
