//引用 nodemailer
var nodemailer = require('nodemailer');
//連線資訊
nodemailer.SMTP = {
    host: "stmp.gmail.com",//server位置
    port: 25,//可不給,預設25
    ssl: false,//可不給,預設false
    user: 'cn27529@gmail.com',//可不給
    pass: 'mydtl689@gpwd',//可不給
    use_authentication: true//可不給
}
//create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport();

//信件內容參數
var mailOptions = {
    from: 'cn27529@hotmail.com',
    to: 'larry0220@gmail.com',
    subject: 'TEST信件title',
    text: 'TEST信件內容',
    attachments: [{
        filename: 'README.md',
        content: 'README.md'
    }]

};

//寄出
transporter.sendMail(mailOptions, function (err, info) {
    //info是成功信件相關資訊;err是失敗相關資訊
});
