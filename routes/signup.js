var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../auth/passport')(passport);
var fitness = require('../integration/googleFit.js');
var fitnessAPI = new fitness();
var User = require('../model/dbuser');
var GCM = require('../jobs/gcm');

/* GET home page. */
router.get('/', function(req, res, next) {
	User.findOne({userId:'fangzhzh@gmail.com'}, function(err, user) {
        if (err) throw err;

        var now = Date.now();
        for( i = 0; i < 90 ; ++i ){
          fitnessAPI.fetchData(user, now);
          now = new Date(now);
          now.setDate(new Date(now).getDate() - 1 );
        }
        return user;
    });
	
	res.render('signup', { title: 'Login' });
});

// process the signup form
router.post('/', passport.authenticate('local-signup', {
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

router.post('/gcm', function(req, res, next) {
	var token = req.body.gcmtoken;
	var userId = req.body.userid;
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  User.findOneAndUpdate(
      {userId:userId},
      {userId:userId, gcmToken:token},
      {upsert:false},
      function(err, user) {
        if(err) {
          console.log(err);
          if(res) res.sendStatus(500);
          return;
        }
        console.log(user);
        if (res) res.sendStatus(200);
      }
  );

	
});

router.post('/gcma', function(req, res, next) {
  var userId = req.body.userid;
  User.findOne({userId: userId}, function(err, user) {
    if(err) {
      console.log(err);
      if(res) res.sendStatus(500);
      return;
    }

    // object of all the users
    console.log(user);
    GCM.sendPush(user.gcmToken);
    res.sendStatus(200);
    res.render('signup', { title: 'Login' });
  });

});

module.exports = router;
