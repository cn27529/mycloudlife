var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var sendMail = require('../mail/sendMail');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html


//忘記密碼1106
router.get('/repwdtest/:email', function(req, res) {

    var email = req.params.email;
    //var token = req.params.token; //先不檢查

    var json = {
        id: 0,
        email: "",
        msg: "沒有資料",
        pwd: "",
        err: ""
    }

    //props
    var mail_data = {
        //mailFrom: 'mycloudedlife1@gmail.com',
        mailFrom: 'service@mycloudedlife.com',
        mailTo: email,
        title: '忘記密碼',
        body: 'Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
        pwd: '1234qwer'
    }

    sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);

    json.err = "";
    json.msg = "ok,郵件己發送";
    res.json(json);

    //callback function
    function sendMailCallback(mailMsg) {

        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

        console.log(mailMsg);
        console.log("sendMailCallback:" + now.toLocaleString());


    }

});


//忘記密碼1106
router.get('/repwd/:email', function(req, res) {

    var email = req.params.email;
    //var token = req.params.token; //先不檢查

    var json = {
        id: 0,
        email: "",
        msg: "沒有資料",
        pwd: "",
        err: ""
    }

    //props
    var mail_data = {
        //mailFrom: 'mycloudedlife1@gmail.com',
        mailFrom: 'service@mycloudedlife.com',
        mailTo: email,
        title: '忘記密碼',
        body: 'Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
        pwd: '1234qwer'
    }

    models.Account.findOne({
        where: {
            email: email
        }
    }).then(function(data) {

        //console.log(data);

        if (data != null) {

            json.msg = "ok";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
            json.err = "";

            mail_data.pwd = data.password;

            //mail body
            mail_data.body = 'Dear ' + mail_data.mailTo + ',<br>Thank you for contacting us<br>This is your password: ' + mail_data.pwd + '<br>For your account security, please change your passowrd later.';

            //取得profile
            models.Profile.findOne({
                where: {
                    AccountId: data.id
                }
            }).then(function(data2) {
                if (data2 != null) {
                    //取得name
                    mail_data.body = 'Dear ' + data2.name + ',<br>Thank you for contacting us<br>This is your password: ' + mail_data.pwd + '<br>For your account security, please change your passowrd later.';
                    sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);
                    console.log(mail_data);
                } else {
                    sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);
                    console.log(mail_data);
                }
            })

            //sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);

            json.err = "";
            json.msg = "ok,郵件己發送";
            res.json(json);


        } else {
            res.json(json);
        }



    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
        res.json(json);
    });

    //callback function
    function sendMailCallback(mailMsg) {

        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

        console.log(mailMsg);
        console.log("sendMailCallback:" + now.toLocaleString());


    }


});


//create
router.post('/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;

    var email = req.body.email;
    var pwd = req.body.pwd;
    var json = {
        id: 0,
        msg: "",
        err: ""
    };

    models.Account.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                email: email,
                password: pwd
            }
        })
        .spread(function(data, created) {
            console.log(data.get({
                plain: true
            }))

            //console.log(data);
            json.id = data.id; //這是使用者的資料代碼, 可存在用戶端
            json.msg = "ok,資料己建立";

            res.json(json);

        }).catch(function(err) {
            // handle error;
            console.log(err);
            json.err = "sql";
            res.json(json);

        });



});

//update
router.post('/mod', function(req, res) {

    var email = req.body.email;
    var id = req.body.id;

    var json = {
        id: 0,
        msg: "沒有資料可更新",
        err: ""
    }

    models.Account.find({
        where: {
            id: id
        }
    }).then(function(data) {

        if (data != null) {
            data.update({
                email: email
            }).then(function() {

            })

            console.log(data);
            json.id = data.id; //這是使用者的資料代碼, 可存在用戶端
            json.err = "";
            json.msg = "ok,資料己更新";
        }
        res.json(json);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        res.json(json);
    });

});



router.post('/login', function(req, res) {

    //var email = req.body.email;
    //var token = req.params.token; //先不檢查

    var json = {
        id: 0,
        email: "",
        msg: "登入帳密不正確",
        pwd: "",
        err: ""
    }

    models.Account.findOne({
        where: {
            email: req.body.email,
            password: req.body.pwd
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {
            json.msg = "ok,登入成功";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
            json.err = "";
        }

        //更新member資料
        models.Member.findOne({
            where: {
                email: data.email,
                memberid: 0
            }
        }).then(function(data) {

          console.log(data);
          console.log('----------------');

            if (data != null && data.flag === "noaccount") {

                //第1次的資料變更
                // data.update({
                //     memberid: json.id,
                //     flag: 'waiting'
                // }).then(function() {
                //
                // })

                //取得profile
                models.Profile.findOne({
                    where: {
                        AccountId: json.id,
                        flag: 'me'
                    }
                }).then(function(data1) {

                    if (data1 != null) {

                        //第2次的資料變更，更新ProfileId
                        data.update({
                            memberid: json.id,
                            flag: 'waiting',
                            ProfileId: data1.id
                        }).then(function() {

                        })

                    }

                });

            }

        });

        res.json(json);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        res.json(json);

    });



});

router.get('/id/:id', function(req, res) {

    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Account.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        //console.log(data);

        if (data != null) {
            json.msg = "ok";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
        }
        res.json(json);

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




router.get('/has/:email', function(req, res) {

    var email = req.params.email;
    //var token = req.params.token; //先不檢查

    var json = {
        id: 0,
        email: "",
        msg: "沒有資料",
        pwd: "",
        err: ""
    }

    models.Account.findOne({
        where: {
            email: email
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {
            json.msg = "ok";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
            json.err = "";
        }

        res.json(json);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
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

    models.Account.findAll({

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
