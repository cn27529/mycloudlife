
//引用 nodemailer
var nodemailer = require('nodemailer');
//連線資訊

nodemailer.SMTP = {
    host: "stmp.gmail.com",//server位置
    port: 465,//可不給,預設25
    ssl: true,//可不給,預設false
    user: 'mycloudedlife1@gmail.com', //可不給
    pass: '1029384756@pwd', //可不給
    use_authentication: true//可不給
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

//寄出
transporter.sendMail(mailOptions, function(err, info) {
    //info是成功信件相關資訊;err是失敗相關資訊
    if(err){
        return console.log(err);
    }
    console.log('Message sent: ' + info.response);
});
