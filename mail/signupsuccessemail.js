/**
 * Created by davidhsu on 1/16/17.
 */
var models = require('../models');
var sendMail = require('../mail/sendMail');

module.exports = function signupSuccessEmail (email, name, pwd) {

    var json = {
        "email": email,
        //"pwd": pwd,
        "name": "",
        "msg": "post沒有電子郵件",
        "err": "repwd"
    }

    if (email === undefined) {
        json.msg = "email is undefined";
        //res.json(json);
    }
    if (email == null) {
        json.msg = "email is null";
        //res.json(json);
    }

    //props
    var mail_data = {
        mailFrom: 'service@mycloudedlife.com',
        mailTo: email,
        title: 'Registration letter from My Clouded life',
        body: 'Dear XXX,<br>Thank you for registering our service.' +
                        '<br>Your ID and Password as below. Please keep it carefully.' +
                        '<br>ID:' +
                        '<br>Password:'+
                        '<br>If you have further questions, welcome to contact us' +
                        '<br>service@mycloudedlife.com' ,
        //pwd: pwd,
        name: name
    }

    //mail body
    mail_data.body = 'Dear ' + email.substring(0,email.indexOf('@'))+ ','+
                    '<br>Thank you for registering our service.' +
                    '<br>Your ID and Password as below. Please keep it carefully.' +
                    '<br>ID: ' + email +
                    '<br>Password: ' + pwd +
                    '<br>If you have further questions, welcome to contact us' +
                    '<br>service@mycloudedlife.com';
    console.log(mail_data);
    //忘記密碼寄送mail


    var now = new Date();
    var month = (now.getMonth() + 1);
    var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
    var mm = (month <= 9) ? '0' + month.toString() : month.toString();
    var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

    models.Maillog.create({
        title: mail_data.title,
        body: mail_data.body,
        mailFrom: mail_data.mailFrom,
        mailTo: mail_data.mailTo,
        msg: "",
        yymmdd: yy + mm + dd,
        yymm: yy + mm
    }).then(function(data) {
        //console.log(data);
        console.log('--models.Maillog.create');
    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        //res.json(json);
    });

    sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);

    json.err = "";
    json.msg = "ok,郵件己發送";
    //res.json(json);

    //callback function
    function sendMailCallback(mailMsg, subject, html, from, to) {
        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();
        console.log(mailMsg);
        console.log("sendMailCallback: " + now.toLocaleString());
    }

};