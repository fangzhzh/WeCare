var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../auth/passport')(passport);
//var article = require('../recommendation/article.js');
//var articleAPI = new article();
var fitness = require('../integration/googleFit.js');
var fitnessAPI = new fitness();
var User = require('../model/dbuser');

/* GET home page. */
router.get('/', function(req, res, next) {
	User.findOne({userId:'amulyakhare@gmail.com'}, function(err, user) {
        if (err) throw err;
        
        fitnessAPI.fetchData(user);

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

module.exports = router;
