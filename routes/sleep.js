/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Sleep = require('../model/dbsleep');
var faker = require('faker');

var articleRecommend = require('../recommendation/article.js');
var articleAPI = new articleRecommend();

/* GET sleep listing. */
router.get('/', function(req, res, next) {
    
    articleAPI.search('pro exercise advice');


});

router.get('/:userid', function(req, res, next) {
    Sleep.find({userId:req.params.userid}, function(err, sleeps) {
        if (err) throw err;

        // object of all the users
        console.log(sleeps);
        res.send(sleeps);
    });
});

router.post('/', function(req, res, next) {
    var sleep = new Sleep({

    });
    var result = saveSleep(sleep, res);
    res.send(result);

});

router.delete('/:userid',function(req, res, next){
    Sleep.remove({userId: req.params.userid}, function(err) {
        if(err)
            return next(err);
        console.log(req.params.userid+'delete susscess');
        res.send(req.params.userid+'delete susscess')
})});

var getAllSleep = function() {
    console.log(__filename + ": " + __function__line);
};

var saveSleep = function(sleep) {

    var newSleep = new Sleep({

    });
    console.log(faker.random.number());
    newSleep.userId = 549851;
    newSleep.dataTime = faker.date.past();
    newSleep.sleepTime = faker.random.number();
    newSleep.deepSleepTime = faker.random.number();
    newSleep.save(function(err){
        if (err) throw err;

        console.log('sleep '+sleep.userId + ' data saved success');
        return 'sleep '+sleep.userId + ' data saved success';
    });
};

router.saveSleep = saveSleep;

module.exports = router;