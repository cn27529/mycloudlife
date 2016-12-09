//引用 nodemailer
var nodemailer = require('nodemailer');
//連線資訊

nodemailer.SMTP = {
    host: "stmp.gmail.com", //server位置
    port: 465, //可不給,預設25
    ssl: true, //可不給,預設false
    user: 'mycloudedlife1@gmail.com', //可不給
    pass: '1029384756@pwd', //可不給
    use_authentication: true //可不給
}


// nodemailer.SMTP = {
//     host: "a2plcpnl0572.prod.iad2.secureserver.net", //server位置
//     port: 465, //可不給,預設25
//     ssl: true, //可不給,預設false
//     user: 'service@mycloudedlife.com', //可不給
//     pass: '3edc#EDC@pwd', //可不給
//     use_authentication: true //可不給
// }

//create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport();

//信件內容參數
var mailOptions = {
    from: 'mycloudedlife1@gmail.com',
    to: 'cn27529@hotmail.com',
    subject: '信件title',
    text: 'TEST信件內容',
    html: '<h3>Hello world 🐴Hello world 🐴</h3>', // html body
    attachments: [{ // utf-8 string as an attachment
        filename: 'README.md',
        content: 'README.md'
    }, ]
};

var name = '王小明';
var pwd = '123456';

var br = '<br>';
var body_lines = new Array();

//mailOptions.subject = '忘記密碼';
body_lines.push('；' + 'Dear ' + name + ',');
body_lines.push('；' + 'Thank you for contacting us');
body_lines.push('；' + 'This is your password: ' + pwd);
body_lines.push('；' + 'For your account security, please change your passowrd later.');

body_lines.push('<hr>');

//mailOptions.subject = 'This is the invitation from ' + name + '!';
body_lines.push('；' + name + ' wants to invite you into their circle on the MyCloudLife App.');
body_lines.push('；' + 'If you dont have this app yet, please download and install the MyCloudLife app from apple store.');
body_lines.push('；' + 'We know you will enjoy it while having fun with your friends and family on the MyCloudLife App.');
body_lines.push('；；' + 'Download app, https://inbox.google.com/u/1/?pli=1');
body_lines.push('；' + 'If you have any questions about app, we love to help you.');
body_lines.push('；' + 'This is our service email: service@myclouded life.com');

//console.log(body_lines);
var body_string = body_lines.join('。');
//console.log(body_string);
body_string = body_string.replace(/。/g, '');
//console.log(body_string);
body_string = body_string.replace(/；/g, br);
//console.log(body_string);
var body_result = body_string;
//console.log(body_result);

mailOptions.html = body_result;

console.log(mailOptions);

//寄出
transporter.sendMail(mailOptions, function(err, info) {
    //info是成功信件相關資訊;err是失敗相關資訊
    if (err) return console.log(err);
    if (info) return console.log(info);
});
