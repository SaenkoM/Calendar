var express = require('express');
var router = express.Router();
const Calendar = require('../models/calendar');

router.post('/events', (req, res) => {
  Calendar.update({user_id: req.session.user_id, day: 1}, {$push: {events: {
    start: req.body.start,
    duration: req.body.duration,
    title: req.body.title
  }}}, (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).end();
    } else {
      res.status(201).end();
    }
  });
});

router.delete('/events/:it', (req, res) => {
  let it = Number(req.params.it);

  Calendar.findOne({user_id: req.session.user_id, day: 1}, {'events': true}, (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).end();
    } else {
      data.events = [...data.events.slice(0, it), ...data.events.slice(it + 1)];
      data.save();
      res.status(200).end();
    }
  });
});

module.exports = router;
