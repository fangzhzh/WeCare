var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../auth/passport')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;
