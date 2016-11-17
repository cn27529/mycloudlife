var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var sendMail = require('../mail/sendMail');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/fileupload.html

var fs = require('fs');

router.get('/', function(req, res) {
    res.send(cool());
    console.log(cool());
});

router.post('/upload', function(req, res) {

    //console.log(req.files);
    //console.log(req.body.myfile.path);
    //console.log(req.files);
    //console.log(req.files.myfile.path);

    //console.log(req);

    var json = {
        msg: "",
        err: "",
        filepath: ""
    };

    fs.readFile(req.files.displayImage.path, function(err, data) {

        var date = new Date();
        var time1 = date.getTime();

        //http://localhost:8080/public/123456/123456.png
        var dirname = "/public/" + time1.toString();
        var newPath = __dirname + dirname;

        fs.writeFile(newPath, data, function(err) {
            if (err) {
                json.msg = err.toString();
                json.err = "upload error"
                res.send(json);
            } else {
                json.msg = "ok,saved";
                json.filepath = newPath;
                res.send(json);
            }
        });
    });

});


module.exports = router;
