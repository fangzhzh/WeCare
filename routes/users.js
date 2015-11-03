var express = require('express');
var router = express.Router();
var User = require('../model/dbuser');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
        res.send(users);
    });
});

router.get('/:userid', function(req, res, next) {
  User.findOne({userId: req.params.userid}).populate("carer").exec( function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
    res.send(users);
  });
});

router.post('/', function(req, res, next) {
    var mike = new User({
        user_name: req.query.name,
        password: req.query.password,
        bind_devices: req.query.bind_device,
        nick_name:req.query.nick_name
    });
    mike.save( function(err){
        if (err) throw err;

        console.log('user '+mike.user_name + ' saved success');
    });
    res.send('respond with from sleep');
});

router.delete('/:userid',function(req, res, next){
    User.remove({userId: req.params.userid}, function(err) {
        if(error)
            return next(error);
        console.log(rreq.params.userid+'delete susscess');
        res.send(req.params.userid+'delete susscess')
    })});


router.sayHello = function(hello){
    console.log(hello + " from users module");

} ;

router.getAllUser = function(callback){
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        callback(users);
    });
};

module.exports = router;




