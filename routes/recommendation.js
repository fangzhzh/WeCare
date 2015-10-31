/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var Recommendatioin = require('../model/dbrecommendation');

/* get recommendation list*/
router.get('/', function(req, res, next){
    getAllRecommendation(res);
});


router.get('/:userid', function(req, res, next) {
  getRecommendation(req.params.userid, res);
});


var getAllRecommendation = function (res) {
    Recommendatioin.find({}, function (err, recommendations) {
      console.log(__filename + ": " + __function__line);
      res.send(recommendations);
    })
}

var getRecommendation = function (userid, res) {
    Recommendatioin.find({userId:userid}, function (err, recommendations ) {
        console.log(__filename + ": " + __function__line);
        res.send(recommendations);
    })
};

var saveRecommendation = function (recommendation, res) {
  recommendation.save(function (err) {
    if(err) {
      res.send(500);
      return next(err);
    }
    console.log(recommendation + " save success");
    res.send(200);
  });

};