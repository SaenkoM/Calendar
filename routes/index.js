const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Calendar = require('../models/calendar');

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
    if(err) {
      console.error(err);
      res.status(500).end();
    } else if(user) {
      req.session.user_id = user._id;
      //Since Calendar covers only one day - get 1st, although normally should retrieve current day or the next one
      Calendar.findOne({user_id: user._id, day: 1}, {_id: 0, 'events._id': 0},  (err, calendar) => {
        if(err) {
          console.error(err);
          res.status(500).end();
        } else if(calendar) {
          res.status(200).end(JSON.stringify({day: calendar.day, events: calendar.events}));
        } else {
          res.status(200).end(JSON.stringify({day: 1, events: []}));
        }
      });
    } else {
      res.status(401).end();
    }
  });
});

module.exports = router;

function initializeDB() {

  function initializeCalendar(user_id) {
    Calendar.findOne({user_id: user_id, day: 1}, (err, calendar) => {
      if(err) console.error(err);
      else if(!calendar) {
        Calendar({
          user_id: user_id,
          day: 1,
          events: [{
            start: 0,
            duration: 15,
            title: "Exercise"
          }, {
            start: 25,
            duration: 30,
            title: "Travel to work"
          }, {
            start: 30,
            duration: 30,
            title: "Plan day"
          }, {
            start: 60,
            duration: 15,
            title: "Review yesterday's commits"
          }, {
            start: 100,
            duration: 15,
            title: "Code review"
          }, {
            start: 180,
            duration: 90,
            title: "Have lunch with John"
          }, {
            start: 360,
            duration: 30,
            title: "Skype call"
          }, {
            start: 370,
            duration: 45,
            title: "Follow up with designer"
          }, {
            start: 405,
            duration: 30,
            title: "Push up branch"
          }]
        }).save((err) => {
          if(err) console.error(err);
          else {
            console.log("DB successfully initialized.");
            console.log("Username: test");
            console.log("Password: 111");
          }
        });
      }
    });
  }

  User.findOne({username: "test"}, (err, user) => {
    if(err) console.error(err);
    else if(user) {
      initializeCalendar(user._id);
    } else {
      User({username: "test", password: "111"}).save((err, user) => {
        if(err) console.error(err);
        else {
          initializeCalendar(user._id);
        }
      });
    }
  });
}

initializeDB();
