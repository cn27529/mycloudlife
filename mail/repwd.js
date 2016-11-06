//引用 nodemailer
var sendMail = require('./sendMail');
var hello = require('./hello');
var models = require('../models');

//props
var data = {
    //mailFrom: 'mycloudedlife1@gmail.com',
    mailFrom: 'service@mycloudedlife.com',
    mailTo: 'cn27529@gmail.com',
    title: '忘記密碼',
    body: 'Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
    pwd: '1234qwer'
}

// to bruce, 這是忘記密碼訊息
//
// Dear XXX,
// Thank you for contacting us
//
// This is your password: @@@$$$$.
// For your account security, please change your passowrd later.


// //取得密碼
// var pwd = "";
// models.Account.findOne({
//     where: {
//         email: 'cn27529@gmail.com'
//             //password: req.body.pwd
//     }
// }).then(function(data) {
//
//     //console.log(data);
//
//     if (data != null) {
//         //json.pwd = data.password;
//         data.body = 'Dear ' + data.mailTo + ',<br>Thank you for contacting us<br>This is your password: ' + data.password + '<br>For your account security, please change your passowrd later.';
//         //成員邀請
//         sendMail(data.mailFrom, data.mailTo, data.title, data.body, sendMailCallback);
//         //createMail('mycloudedlife1@gmail.com', 'cn27529@hotmail.com', '成員邀請', '<h3>測試測試</h3>');
//     }
//
//     //res.json(json);
//
// }).catch(function(err) {
//     // handle error;
//     console.log(err);
//     json.err = "sql";
//     //json.msg = "";
//     //res.json(json);
// });


data.body = 'Dear ' + data.mailTo + ',<br>Thank you for contacting us<br>This is your password: ' + data.pwd + '<br>For your account security, please change your passowrd later.';
sendMail(data.mailFrom, data.mailTo, data.title, data.body, sendMailCallback);


function sendMailCallback(mailMsg) {

    console.log(mailMsg);

    var now = new Date();
    var month = (now.getMonth() + 1);
    var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
    var mm = (month <= 9) ? '0' + month.toString() : month.toString();
    var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

    // models.Maillog.create({
    //     title: data.title,
    //     body: data.body,
    //     mailFrom: data.mailFrom,
    //     mailTo: data.mailTo,
    //     msg: mailMsg,
    //     yymmdd: yy + mm + dd,
    //     yymm: yy + mm
    // }).then(function(data) {
    //     if (data != null) {}
    //     console.log('models.Maillog.create');
    // })

}
