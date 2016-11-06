//引用 nodemailer
var sendMail = require('./sendMail');
var hello = require('./hello');

//props
var data = {
    mailFrom: 'mycloudedlife1@gmail.com',
    mailTo: 'cn27529@gmail.com',
    title: '成員邀請',
    body: '<h3>測試測試</h3>'
}

//成員邀請
sendMail(data.mailFrom, data.mailTo, data.title, data.body, sendMailCallback);

//callback function
function sendMailCallback(mailMsg) {
    console.log(mailMsg);
}
