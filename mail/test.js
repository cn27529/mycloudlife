//引用 nodemailer
var nodemailer = require('nodemailer');

/*
nodemailer.SMTP = {
    host: "stmp.gmail.com",//server位置
    port: 25,//可不給,預設25
    ssl: false,//可不給,預設false
    user: 'mycloudedlife1@gmail.com', //可不給
    pass: '1029384756@pwd', //可不給
    use_authentication: true//可不給
}
*/

nodemailer.SMTP = {
    host: "a2plcpnl0572.prod.iad2.secureserver.net",
    port: 465,
    ssl: true,
    user: 'service@mycloudedlife.com',
    pass: 'a94139413C',
    use_authentication: true
}

//create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport();

//信件內容參數
var mailOptions = {
    from: 'service@mycloudedlife.com',
    to: 'cn27529@gmail.com',
    subject: '信件測試-20170126',
    text: '信件內容-20170126',
    html: '<h1>Hello world 🐴</h1>'
};

//寄出
transporter.sendMail(mailOptions, function(err, info) {
    //info是成功信件相關資訊;err是失敗相關資訊
    if (err) {
        console.log(err);
    } else {
        console.log('Server is ready to take our messages');
        console.log(info);
    }
});
