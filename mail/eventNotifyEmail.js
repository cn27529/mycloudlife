/**
 * Created by davidhsu on 1/16/17.
 */
var models = require('../models');
var sendMail = require('../mail/sendMail');
var getAccIDByProfileId = require('../routes/profile').getAccIDByProfileId;
var getEmailByAccId = require('../routes/account').getEmailByAccId;
var getMemList = require('../routes/member').getMemList;



var getMyMemEmailList = function(id) {
    var mlist = getMemList(id);
    var emails = [];

    return mlist.then(function(data) {
        //console.log('--pack list');
        //console.log(data);
        //console.log('--member list');
        //console.log(data.members)

        data.members.forEach(function(mem) {
            console.log(mem.dataValues.email);
            emails.push(mem.dataValues.email);
        }, this);

        console.log(emails);

        return emails;

        //res.json(data);
    });
};


var eventNotifyEmail = function (profileId, eventMode, stime) {

    //TODO: get account id by profileid
    console.log('--profileId');
    console.log(profileId);

    var accountinfo = getAccIDByProfileId(profileId);
    accountinfo.then(function(accinfo){
        console.log('--accid');
        console.log(accid);
        var accid = accinfo.accid;
        var accname = accinfo.accname;

        var accountemail = getEmailByAccId(accid);
        accountemail.then(function(accemail){
            console.log('--accemail');
            console.log(accemail);

            var mailtitle = '';
            var mailmsgtype = '';

            switch (eventMode) {
                case 'create':
                    mailtitle = 'Event invitation from ' + accname;
                    mailmsgtype = '';
                    break;
                case 'modify':
                    mailtitle = 'Event changed from ' + accname;
                    mailmsgtype = '<br>It has been changed.';
                    break;
                case 'remove':
                    mailtitle = 'Event canceled from ' + accname;
                    mailmsgtype = '<br>It has been canceled.';
                    break;
            }

            var json = {
                "email": '', //email,
                "name": "",
                "msg": "post沒有電子郵件",
                "err": "repwd"
            }



            //props
            var mail_data = {
                mailFrom: accemail,
                mailTo: '',
                title: mailtitle,
                body: 'Content:' +
                        '<br>' + accname + ' invites you to his/her event on ' + stime +
                        mailmsgtype +
                        '<br>Please check my clouded life App',
                //pwd: pwd,
                name: 'david'
            }


            var now = new Date();
            var month = (now.getMonth() + 1);
            var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
            var mm = (month <= 9) ? '0' + month.toString() : month.toString();
            var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();
            var tinfo = {
                now: now,
                month: month,
                yy: yy,
                mm: mm,
                dd: dd
            }


            var memlist = getMyMemEmailList(accid);
            memlist.then(function(mlist){
                mlist.forEach(function(mememail) {
                    //console.log('--mem email');
                    //console.log(mememail);

                    sentEventEmail(mail_data, tinfo, mememail);

                }, this);
            });

        });

    });
};



var sentEventEmail = function(mail_data, tinfo, mailto) {

    models.Maillog.create({
        title: mail_data.title,
        body: mail_data.body,
        mailFrom: mail_data.mailFrom,
        mailTo: mailto,
        msg: "",
        yymmdd: tinfo.yy + tinfo.mm + tinfo.dd,
        yymm: tinfo.yy + tinfo.mm
    }).then(function(data) {
        console.log(data);
        console.log('models.Maillog.create');
    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        //res.json(json);
    });


    console.log(mail_data);



    sendMail(mail_data.mailFrom, mailto, mail_data.title, mail_data.body, sendMailCallback);

    //json.err = "";
    //json.msg = "ok,郵件己發送";
    //res.json(json);

    //callback function
    function sendMailCallback(mailMsg, subject, html, from, to) {
        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();
        console.log(mailMsg);
        console.log("sendMailCallback: " + now.toLocaleString());
    }
};

module.exports = eventNotifyEmail;