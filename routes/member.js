var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/member.html

router.post('/', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;
    var id = req.body.id;
    var memberid = req.body.member.memberid;
    var email = req.body.member.email;
    var tag = req.body.member.tag;

    console.log(id);
    console.log(memberid);
    console.log(email);
    console.log(tag);


    res.send(cool());
    console.log(cool());

});

//create
router.post('/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;
    var id = req.body.id;
    var memberid = req.body.member.memberid;
    var email = req.body.member.email;
    var tag = req.body.member.tag;
    var ProfileId = req.body.member.ProfileId;
    var flag = "";

    console.log(id);
    console.log(memberid);
    console.log(email);
    console.log(tag);

    var json = {
        id: 0,
        msg: "建立過程有錯誤請查看值的正確性",
        err: ""
    }

    //區分三種狀態： 被邀請有account=waiting／己同意被邀請成為對方的成員=accpeted／被邀請沒account=noaccount
    if (memberid == 0) flag = "noaccount";
    if (memberid > 0) flag = "waiting";

    models.Member.findOrCreate({
            where: {
                AccountId: id,
                email: email
                //tag: tag
            },
            defaults: {
                memberid: memberid,
                email: email,
                tag: tag,
                AccountId: id,
                flag: flag,
                ProfileId: ProfileId
            }
        })
        .spread(function(data, created) {
            console.log(data.get({
                    plain: true
                }))
                //console.log(data);
            json = {
                "id": data.id, //這是資料代碼
                "msg": "ok,資料己建立"
            }
            res.json(json);

        }).catch(function(err) {
            // handle error;
            console.log(err);
            json.err = "sql";
            //json.msg = "";
            res.json(json);
        });

});


//update
router.post('/mod', function(req, res) {

    var AccountId = req.body.id;
    var id = req.body.member.id;
    var memberid = req.body.member.memberid;
    var email = req.body.member.email;
    var tag = req.body.member.tag;
    var ProfileId = req.body.member.ProfileId;
    var flag = req.body.member.flag;

    var json = {
        id: 0,
        msg: "沒有資料可更新",
        err: ""
    }

    models.Member.find({
        where: {
            id: id,
            AccountId: AccountId
        }
    }).then(function(data) {

        if (data != null) {
            data.update({
                memberid: memberid,
                email: email,
                tag: tag,
                AccountId: id,
                flag: flag,
                ProfileId: ProfileId
            }).then(function() {

            })

            console.log(data);
            json.id = data.id; //這是使用者的資料代碼, 可存在用戶端
            json.err = "";
            json.msg = "ok,資料己更新";
        }

        res.json(json);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
        res.json(json);
    });

});



//取得我的成員
router.get('/acc/:id', function(req, res) {

    var id = req.params.id;
    //var tag = req.params.tag;
    //var token = req.params.token; //先不檢查
    var json = {
        id: "",
        msg: "沒有資料",
        err: "",
        members: []
    }

    models.Member.findAll({
        where: {
            AccountId: id
                //tag: tag
        }
    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        //console.log(data);
        json.id = id;
        json.msg = "ok";
        json.members = data;
        res.json(json);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = err.message;
        res.json(json);

    });

    //res.send(cool());
    //console.log(cool());

});


router.get('/id/:id', function(req, res) {

    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有找到資料",
        err: "",
        member: null
    }

    models.Member.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        //console.log(data);
        if (data != null) {
            json.msg = "ok";
            json.id = data.id;
            json.member = data;
        }
        res.json(json);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = err.message;
        res.json(json);
    });
    //res.send(cool());
    //console.log(cool());

});


//刪除資料
router.get('/del/:id', function(req, res) {

    var id = req.params.id;

    var json = {
        id: id,
        msg: "沒有資料可刪除",
        err: ""
    }

    models.Member.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {

            models.Member.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(data) {
                console.log(data);

                json.msg = "ok,刪除";
                json.id = data.id;
                res.json(json);

            });

        } else {
            res.json(json);
        }

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        json.msg = "";
        res.json(json);
    });

});

//all的通關密語是Q_QtaiwanQvQ
//router.get('/all/:keyword', function(req, res) {
router.get('/all', function(req, res) {

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: "沒有資料",
        err: ""
    }

    models.Member.findAll({

    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        //console.log(data);
        res.json(data);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = err.message;
        res.json(json);
    });

    //res.send(cool());
    //console.log(cool());

});


module.exports = router;
