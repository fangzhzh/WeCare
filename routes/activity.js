/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express  =require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Activity = require('../model/dbactivity');

router.get('/', function(req, res, next) {
  console.log(__function__line);
  getActivity(0, res);
  res.send(0);
});

router.get('/:userid', function(req, res, next) {
});

var getActivity = function (userid, res) {
  var test = [
    [24, 1, 2.2, 9000, 346.7], //3
    [30, 0, 2, 5000, 46.7], //2
    [35, 1, 0.8, 10000, 246.7], //1
    [40, 0, 0.4, 2000, 80.3] //0
  ];
  return test;
};


var saveActivity = function (activity, res) {
  var newActiviy = new Activity();
  newActiviy.activity = activity.activity;
  newActiviy.createTime = activity.createTime;
  newActiviy.dateTime = activity.dateTime;
  newActiviy.distance = activity.distance;
  newActiviy.steps =    activity.steps;
  newActiviy.type =  activity.type;
  newActiviy.userId = activity.userId;
  newActiviy.save(function (err) {
    if(err) {
      res.send(500);
      return next(err);
    }
    console.log(__function__line+ Activity +  " save success");
    res.send(200);
  });
};


router.getActivity = getActivity;
module.exports = router;