//引用 nodemailer
var sendMail = require('./sendMail');
var hello = require('./hello');

//props
var data = {
    mailFrom: 'mycloudedlife1@gmail.com',
    mailTo: 'cn27529@hotmail.com',
    title: '忘記密碼',
    body: '<h3>測試測試</h3>'
}

//成員邀請
sendMail(data.mailForm, data.mailTo, data.title, body);
//createMail('mycloudedlife1@gmail.com', 'cn27529@hotmail.com', '成員邀請', '<h3>測試測試</h3>');
