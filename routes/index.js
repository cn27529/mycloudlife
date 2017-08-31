//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

router.get('/', function (req, res) {

    let style = '<style> .use-transform { '
      +'width:100%;'
      +'height:100%;'
      +'border:1px solid #000;'
    +'} '
    +'.use-transform div{'
      +'position: relative;'
      +'width:auto;'
      +'height:auto;'
      +'top:50%;'
      +'transform:translateY(-50%);'
      //+'background:#095;'
    +'} h1{ margin-left:50%; }'
    +'  </style>';


    let hello = '<h1>' + cool() + '</h1>';
    let html = '<div class="use-transform"><div>'+ hello +'</div></div>';
    //res.send(hello);
    res.send(html);
    console.log(cool());
});
//margin:0px auto;
module.exports = router;
