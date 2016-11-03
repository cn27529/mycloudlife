var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/note.html

//create
router.post('/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;
    var id = req.body.id;
    var title = req.body.note.title;
    var body = req.body.note.body;
    var noteday = req.body.note.noteday;

    var json = {
        id: 0,
        msg: "建立過程有錯誤請查看值的正確性",
        err: ""
    }

    models.Note.findOrCreate({
            where: {
                title: title,
                noteday: noteday,
                ProfileId: id
            },
            defaults: {
                title: title,
                body: body,
                noteday: noteday,
                ProfileId: id
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

    var id = req.body.note.id;
    var title = req.body.note.title;
    var body = req.body.note.body;
    var noteday = req.body.note.noteday;


    var json = {
        id: 0,
        msg: "沒有資料可更新",
        err: ""
    }

    models.Note.find({
            where: {
                id: id
            }
        })
        .then(function(data) {

            if (data != null) {
                data.update({
                        title: title,
                        body: body,
                        noteday: noteday
                    })
                    .then(function() {

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

router.get('/id/:id', function(req, res) {

    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        note: null
    }

    models.Note.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        //console.log(data);
        if (data != null) {
            json.msg = "ok";
            json.id = data.id;
            json.note = data;
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


// router.get('/pro', function(req, res) {
//     res.json(cool());
// });
// router.get('/all/:id', function(req, res) {
//     res.json(cool());
// });
// http://yourdomain/note/pro/:id/:top
// :id 這是profile資料代碼
// :top 是要取得幾筆給前端, 若10, 表示給前端10筆photo
router.get('/pro/:id/:top', function(req, res) {

    var json = {
        id: 0,
        msg: "沒有查詢到資料",
        err: "",
        notes: []
    }
    var id = req.params.id;
    var top = req.params.top;
    //var token = req.params.token; //先不檢查

    models.Note.findAll({
        where: {
            ProfileId: id
        },
        limit: top
    }).then(function(data) {

        //console.log(data);
        if (data.length > 0) {
            json.notes = data;
            json.msg = "ok";
        }
        json.id = id;
        res.json(json);

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



// http://yourdomain/note/next/:id/:limit/:currentid
// :id 這是profile資料代碼
// :limit 是要取得幾筆給前端, 若10, 表示給前端10筆
// :currentid 提供目前最後一筆的note id, 會由目前的note id往下找:limit筆
router.get('/next/:id/:top/:currentid', function(req, res) {

    var json = {
        id: 0,
        msg: "沒有查詢到資料",
        err: "",
        notes: []
    }
    var id = req.params.id;
    var top = req.params.top;
    var currentid = req.params.currentid;
    //var token = req.params.token; //先不檢查

    models.Note.findAll({
        where: {
            ProfileId: id,
            id: {
                $gt: currentid
            }
        },
        limit: top
    }).then(function(data) {

        //console.log(data);
        if (data.length > 0) {
            json.notes = data;
            json.msg = "ok";
        }
        json.id = id;
        res.json(json);

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


//刪除資料
router.get('/del/:id', function(req, res) {

    var id = req.params.id;

    var json = {
        id: id,
        msg: "沒有資料可刪除",
        err: ""
    }

    models.Note.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {

            models.Note.destroy({
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


//all的通關密語是Q_QtaiwanQvQ
//router.get('/all/:keyword', function(req, res) {
router.get('/all', function(req, res) {

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: "沒有資料",
        err: ""
    }

    models.Note.findAll({

    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        if (data == null) data = cool();
        res.json(data);

    }).catch(function(err) {
        // handle error;
        console.log(err);
        json.err = "sql";
        json.msg = "";
        res.json(json);
    });

    //res.send(cool());
    //console.log(cool());

});


module.exports = router;
