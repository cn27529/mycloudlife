var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var sendMail = require('../mail/sendMail');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/file.html

var fs = require('fs');
var path = require('path');

var multer = require('multer'); //https://github.com/expressjs/multer
var upload = multer({ dest: 'public/' });

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/')
//   },
//   filename: function (req, file, cb) {
//          var date = new Date();
//          var time1 = date.getTime();
//     cb(null, file.fieldname + '-' + time1)
//   }
// })
// var upload = multer({ storage: storage })

router.get('/', function(req, res) {
    res.send(cool());
    console.log(cool());
});

//router.post('/upload', function(req, res) {
router.post('/upload', upload.single('file'), function(req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    console.log(req.file);

    //res.send(req.file);

    var qq = {
        fieldname: 'file',
        originalname: '螢幕快照 2016-11-14 22.29.48.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'public/',
        filename: 'cecaf4b376629d34593efbf0d4af20e8',
        path: 'public/cecaf4b376629d34593efbf0d4af20e8',
        size: 86041
    }

    var json = {
        msg: "ok,己上傳",
        err: "",
        filepath: req.file.path,
        size: req.file.size
    };

    res.send(json);

    // fs.readFile(req.file.displayImage.path, function(err, data) {
    //
    //     var date = new Date();
    //     var time1 = date.getTime();
    //
    //     //http://localhost:8080/public/123456/123456.png
    //     var dirname = "/public/" + time1.toString();
    //     var newPath = __dirname + dirname;
    //
    //     fs.writeFile(newPath, data, function(err) {
    //         if (err) {
    //             json.msg = err.toString();
    //             json.err = "upload error"
    //             res.send(json);
    //         } else {
    //             json.msg = "ok,saved";
    //             json.filepath = newPath;
    //             res.send(json);
    //         }
    //     });
    // });

});


module.exports = router;
