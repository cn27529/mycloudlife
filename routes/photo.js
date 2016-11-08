var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html

//create ok
router.post('/create', function(req, res) {
    //token檢查, 先不檢查
    //var token = req.body.token;
    var json = {};

    // create新相簿
    models.Photo.create({
        title: req.body.photo.title,
        body: req.body.photo.body,
        photoday: req.body.photo.photoday,
        ProfileId: req.body.id
    }).then(function(data) {
        // console.log(data.get({ plain: true }));

        // 存入相片
        var photo_images = req.body.photo_images || [];
        photo_images.forEach(function(item) {
            models.Photo_image.create({
                title: item.title,
                image: item.image,
                PhotoId: data.id,
                ProfileId: req.body.id
            })
        });

        json = {
            "id": data.id, //這是使用者的資料代碼, 可存在用戶端
            "msg": "ok,資料己建立",
            "err": ""
        };

        res.json(json);
    });
});

//update ok
router.post('/mod', function(req, res) {
    var json = {
        id: 0,
        msg: "沒有資料可更新",
        err: "",
    }

    models.Photo.findOne({
        where: {
            ProfileId: req.body.id,
            id: req.body.photo.id
        }
    }).then(function(data) {
        if (data === null) {
            return res.json(json);
        }

        var photoId = data.id;
        json.id = photoId; //這是 photo id資料代碼, 可存在用戶端

        console.log(data.get({
            plain: true
        }));

        data.update({
                title: req.body.photo.title,
                body: req.body.photo.body,
            })
            .then(function(data) {
                // update photo_image
                var photo_images = req.body.photo_images || [];

                photo_images.forEach(function(item) {
                    models.Photo_image.findOne({
                            where: {
                                PhotoId: photoId,
                                id: item.id
                            }
                        })
                        .then(function(image) {
                            if (image === null) {
                                return
                            }

                            image.update({
                                title: item.title,
                                image: item.image
                            });
                        });
                });

                json.err = "";
                json.msg = "ok,資料己更新";

                res.json(json);

            })
    });

});


// get by id
router.get('/limit/:id/:top', function(req, res) {
    var id = req.params.id;
    var top = req.params.top;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        photos: []
    }

    models.Profile.findOne({
        where: {
            id: id
        }
    }).then(function(data) {
        if (data === null) {
            return res.json(json);
        }

        var profileId = data.id;
        json.id = data.id;
        json.msg = "ok";

        // 撈photo的資料
        models.Photo.findAll({
            where: {
                ProfileId: profileId
            },
            limit: parseInt(top),
            include: [{
                model: models.Photo_image,
            }],
        }).then(function(photos) {

            res.json(photos);
        });

    });
    //res.send(cool());
    console.log(cool());

});


// http://yourdomain/photo/next/:id/:limit/:currentid
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

    models.Photo.findAll({
        where: {
            ProfileId: id,
            id: {
                $gt: currentid
            }
        },
        limit: parseInt(top)
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


// delete by photo id
router.get('/del/:id', function(req, res) {
    models.Photo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(data) {
            console.log(data);
            res.json({
                "id": req.params.id,
                "msg": "ok",
                "err": ""
            })
        });
});

// delete by photo_image id
router.get('/delimage/:id', function(req, res) {
    models.Photo_image.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        console.log(data);
        res.json({
            "id": req.params.id,
            "msg": "ok",
            "err": ""
        })
    });
})



//all的通關密語是Q_QtaiwanQvQ
//router.get('/all/:keyword', function(req, res) {
router.get('/all', function(req, res) {

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查

    models.Photo.findAll({

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

})


//all的通關密語是Q_QtaiwanQvQ
//router.get('/all/:keyword', function(req, res) {
router.get('/imageall', function(req, res) {

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查

    models.Photo_image.findAll({

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

})



module.exports = router;
