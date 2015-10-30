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
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;
