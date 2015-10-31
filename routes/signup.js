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
	var userId = req.body.userId;
	
});

router.get('/gcm', function(req, res, next) {
	GCM.sendPush("amulyakhare@gmail.com")
	res.render('signup', { title: 'Login' });
});

module.exports = router;
