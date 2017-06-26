//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

router.get('/', function(req, res) {
    let hello = '<h1>'+cool()+'</h1>';
    res.send(hello);
    console.log(cool());
});

module.exports = router;
