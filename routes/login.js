var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../auth/passport')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/',
	passport.authenticate('local-login'),
	function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/profile?userId=' + req.user.userId + '&token=' + req.user.password);
});

// process the signup form
router.get('/google', passport.authenticate('google', { scope : ['profile', 'email', 'https://www.googleapis.com/auth/fitness.body.read', 'https://www.googleapis.com/auth/fitness.activity.read', 'https://www.googleapis.com/auth/fitness.location.read'] }));

// the callback after google has authorized the user
router.get('/google/callback',
	passport.authenticate('google', {
	    successRedirect : '/profile',
	    failureRedirect : '/'
}));

module.exports = router;
