var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var sendMail = require('../mail/sendMail');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/maillog.html


//忘記密碼寄送mail
router.get('/repwd/:email', function(req, res) {

    //var email = req.body.email;
    var email = req.params.email;

    var json = {
        "email": email,
        "pwd": "",
        "msg": "找不到這個帳號的電子郵件",
        "err": "repwd",
        "id": ""
    }

    if (email === undefined) {
        console.log('undefined');
        res.json(json);
    }
    if (email == null) {
        console.log('null');
        res.json(json);
    }

    //找密碼
    models.Account.findOne({
        where: {
            email: email
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {

            json.msg = "ok,己傳送密碼";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
            json.err = "";

            console.log(json.msg);

            //props
            var data = {
                    mailFrom: 'mycloudedlife1@gmail.com',
                    mailTo: email,
                    title: '忘記密碼寄送mail',
                    body: '<h3>你的密碼：' + json.pwd + '</h3>'
                }
                //忘記密碼寄送mail
            sendMail(data.mailFrom, data.mailTo, data.title, data.body);
            //createMail('mycloudedlife1@gmail.com', 'cn27529@hotmail.com', '成員邀請', '<h3>測試測試</h3>');
            res.json(json);

        }

        if (data === null) {
            console.log(json);
            res.json(json);
        }

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
        res.json(json);
    });



});

//邀請成員寄送mail
router.get('/reqemail/:email', function(req, res) {

    //var email = req.body.email;
    var email = req.params.email;

    var json = {
        "email": email,
        "pwd": "",
        "msg": "找不到這個帳號的電子郵件",
        "err": "reqemail",
        "id": ""
    }

    if (email === undefined) {
        console.log('undefined');
        res.json(json);
    }
    if (email == null) {
        console.log('null');
        res.json(json);
    }

    //找密碼
    models.Account.findOne({
        where: {
            email: email
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {

            json.msg = "ok,己傳送密碼";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
            json.err = "";

            console.log(json.msg);

            //props
            var data = {
                    mailFrom: 'mycloudedlife1@gmail.com',
                    mailTo: email,
                    title: '忘記密碼寄送mail',
                    body: '<h3>你的密碼：' + json.pwd + '</h3>'
                }
                //忘記密碼寄送mail
            sendMail(data.mailFrom, data.mailTo, data.title, data.body);
            //createMail('mycloudedlife1@gmail.com', 'cn27529@hotmail.com', '成員邀請', '<h3>測試測試</h3>');
            res.json(json);

        }

        if (data === null) {
            console.log(json);
            res.json(json);
        }

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
        res.json(json);
    });



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

        //console.log(data);
        res.json(data);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
        res.json(json);
    });

    //res.send(cool());
    //console.log(cool());

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

        //console.log(data);
        res.json(data);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
        res.json(json);
    });

    //res.send(cool());
    //console.log(cool());

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
        // handle error;
        console.log(err);
        json.err = "sql";
        res.json(json);
    });
    //console.log(cool());

});

module.exports = router;
