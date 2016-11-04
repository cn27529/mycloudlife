var models = require('../models');
var express = require('express');
var router = express.Router();


//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html

//create ok
router.post('/create', function(req, res) {
  //token檢查, 先不檢查
  //var token = req.body.token;
  var event;
  try {
    event = {
      title: req.body.event.title,
      people: req.body.event.people.join(','),
      start: req.body.event.start,
      end: req.body.event.end,
      all_day: req.body.event.all_day,
      reminder: req.body.event.reminder,
      calendar: req.body.event.calendar,
      notes: req.body.event.notes,
      mode: req.params.mode,
      ProfileId: parseInt(req.body.id)
    }

    switch (req.body.mode) {
      case 'multiple':
        event.multiple = req.body.multiple.join(',');
        break;
      case 'repeat':
        event.repeat_type = req.body.event.repeat_type;
        event.repeat_detail = req.body.event.repeat_detail;
        event.repeat_until = req.body.event.repeat_until;
      default:
    }
  } catch (err) {
    console.log(err.message);
    return res.json({
      err: err.message
    })
  }


  // create calendar & event
  models.Calendar
    .findOrCreate({
      where: {
        start: event.start,
        ProfileId: event.ProfileId
      },
      defaults: {
        start: event.start,
        ProfileId: event.ProfileId
      }
    })
    .spread(function(data) {
      // console.log(data.get({ plain: true }));

      event.CalendarId = parseInt(data.id);
      models.Calendar_event
        .create(event);

      console.log(typeof event.ProfileId, typeof event.CalendarId);
      // mode: single, multiple, repeat
      json = {
        "id": event.ProfileId, //這是使用者的資料代碼, 可存在用戶端
        "msg": "ok,資料己建立",
        "err": ""
      };

      res.json(json);
    });
});


// get by id
router.get('/limit/:id/:start/:top', function(req, res) {
  var id = parseInt(req.params.id);
  var start = req.params.start;
  var top = parseInt(req.params.top);
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

    // 撈calendar的資料
    models.Calendar.findAll({
      where: {
        start: start,
        ProfileId: profileId
      },
      limit: top,
      include: [{
        model: models.Calendar_event,
      }],
    }).then(function(events) {

      res.json(events);
    });

  });
});

module.exports = router;
