var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/maillog.html

//create
router.post('/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;

    var json = {
        id: 0,
        msg: "",
        err: ""
    };

    var yy = new Date().getFullYear().toString();
    var mm = (new Date().getMonth()) < 10 ? '0' + new Date().getMonth().toString() : new Date().getMonth().toString();
    var dd = (new Date().getDate()) < 10 ? '0' + new Date().getDate().toString() : new Date().getDate().toString();

    models.Maillog.findOrCreate({
            where: {
                id: 0
            },
            defaults: {
                title: req.body.title,
                body: req.body.body,
                mailForm: req.body.mailForm,
                mailTo: req.body.mailTo,
                msg: req.body.msg,
                yymmdd: yy + mm + dd,
                yymm: yy + mm
            }
        })
        .spread(function(data, created) {
            console.log(data.get({
                plain: true
            }))

            //console.log(data);
            json.id = data.id; //這是使用者的資料代碼, 可存在用戶端
            json.msg = "ok,資料己建立";

            res.json(json);

        }).catch(function(err) {
            // handle error;
            console.log(err);
            json.err = "sql";
            json.msg = err;
            res.json(json);

        });

});


//刪除資料
router.get('/del/:id', function(req, res) {

    var id = req.params.id;

    var json = {
        id: id,
        msg: "沒有資料可刪除",
        err: ""
    }

    models.Maillog.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {

            models.Maillog.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(function(data) {
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


router.get('/yymmdd/:yymmdd', function(req, res) {

    var yymmdd = req.params.yymmdd;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Maillog.findAll({
        where: {
            yymmdd: yymmdd
        }
    }).then(function(data) {

        //console.log(data);
        res.json(data);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
        res.json(json);
    });

    //res.send(cool());
    //console.log(cool());

});


router.get('/yymm/:yymm', function(req, res) {

    var yymm = req.params.yymm;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Maillog.findAll({
        where: {
            yymm: yymm
        }
    }).then(function(data) {

        //console.log(data);
        res.json(data);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        //json.msg = "";
        res.json(json);
    });

    //res.send(cool());
    //console.log(cool());

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

    models.Maillog.findAll({

    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        if (data == null) data = cool();
        res.json(data);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        res.json(json);
    });
    //console.log(cool());

});

module.exports = router;
