//引用 nodemailer
var nodemailer = require('smtp');
var mailer = require('sendMail');

//props
var data = {
    mailFrom: 'mycloudedlife1@gmail.com',
    mailTo: 'cn27529@hotmail.com',
    title: '忘記密碼',
    body: '<h3>測試測試</h3>'
}

//成員邀請
mailer.sendMail(data.mailForm, data.mailTo, data.title, body);
