var models = require('../models');
var express = require('express');
var router = express.Router();


//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html

//create ok
router.post('/create', function(req, res) {
  //token檢查, 先不檢查
  //var token = req.body.token;
  var calendar;
  try {
    calendar = {
      title: req.body.event.title,
      people: req.body.event.people.join(','),
      start: req.body.event.start,
      end: req.body.event.end,
      all_day: req.body.event.all_day,
      reminder: req.body.event.reminder,
      calendar: req.body.event.calendar,
      notes: req.body.event.notes,
      mode: req.params.mode,
      ProfileId: req.body.id
    }

    switch (req.body.mode) {
      case 'multiple':
        calendar.multiple = req.body.multiple.join(',');
        break;
      case 'repeat':
        calendar.repeat_type = req.body.event.repeat_type;
        calendar.repeat_detail = req.body.event.repeat_detail;
        calendar.repeat_until = req.body.event.repeat_until;
      default:
    }
  } catch (err) {
    console.log(err.message);
    return res.json({
      err: err.message
    })
  }


  // create calendar
  models.Calendar.create(calendar).then(function(data) {
    // console.log(data.get({ plain: true }));

    // mode: single, multiple, repeat
    json = {
      "id": data.id, //這是使用者的資料代碼, 可存在用戶端
      "msg": "ok,資料己建立",
      "err": ""
    };

    res.json(json);
  });
});



module.exports = router;
