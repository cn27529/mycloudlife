//引用 nodemailer
var sendMail = require('./sendMail');
var hello = require('./hello');
var models = require('../models');

//props
var data = {
    mailFrom: 'mycloudedlife1@gmail.com',
    mailTo: 'cn27529@gmail.com',
    title: '忘記密碼',
    body: '<h3>測試測試</h3>'
}

//成員邀請
sendMail(data.mailFrom, data.mailTo, data.title, data.body, sendMailCallback);
//createMail('mycloudedlife1@gmail.com', 'cn27529@hotmail.com', '成員邀請', '<h3>測試測試</h3>');

function sendMailCallback(mailMsg) {

    console.log('sendMailCallback');

    var now = new Date();
    var month = (now.getMonth() + 1);
    var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
    var mm = (month <= 9) ? '0' + month.toString() : month.toString();
    var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

    models.Maillog.create({
        title: data.title,
        body: data.body,
        mailFrom: data.mailFrom,
        mailTo: data.mailTo,
        msg: mailMsg,
        yymmdd: yy + mm + dd,
        yymm: yy + mm
    }).then(function(data) {
        if (data != null) {}
        console.log('models.Maillog.create');
    })

}
