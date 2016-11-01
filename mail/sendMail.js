//引用 nodemailer
var nodemailer = require('nodemailer');
var models = require('../models');

module.exports = function(mailFrom, mailTo, title, body) {

    //連線資訊
    nodemailer.SMTP = {
        host: "stmp.gmail.com", //server位置
        port: 25, //可不給,預設25
        ssl: false, //可不給,預設false
        user: 'mycloudedlife1@gmail.com', //可不給
        pass: '1029384756@pwd', //可不給
        use_authentication: true //可不給
    }

    //create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport();

    //信件內容參數
    var mailOptions = {
        from: mailFrom,
        to: mailTo,
        subject: title,
        html: body
            // attachments: [{
            //     filename: 'README.md',
            //     content: 'README.md'
            // }]
    };

    //寄出
    transporter.sendMail(mailOptions, function(err, info) {
        //info是成功信件相關資訊;err是失敗相關資訊
        var mailMsg = "";

        if (err) {

            console.log(err);

            mailMsg = err.toString();

            models.Maillog.create({
                title: mailOptions.subject,
                body: mailOptions.html,
                mailFrom: mailOptions.from,
                mailTo: mailOptions.to,
                msg: mailMsg
            }).then(function(data) {
                if (data != null) {}
            })

            return console.log(err.toString());
        }

        console.log(info);
        mailMsg = info.toString();

        models.Meillog.create({
            title: mailOptions.subject,
            body: mailOptions.html,
            mailFrom: mailOptions.from,
            mailTo: mailOptions.to,
            msg: mailMsg
        }).then(function(data) {
            if (data != null) {}
        })


    });

    return transporter;

};
