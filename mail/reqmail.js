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
