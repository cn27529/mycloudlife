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

data.body = 'Dear ' + data.mailTo + ',<br>Thank you for contacting us<br>This is your password: ' + data.pwd + '<br>For your account security, please change your passowrd later.';
sendMail(data.mailFrom, data.mailTo, data.title, data.body, sendMailCallback);

//callback function
function sendMailCallback(mailMsg) {
    console.log(mailMsg);
}
