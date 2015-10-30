/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express  =require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Activity = require('../model/dbactivity');

router.get('/', function(req, res, next) {

});

router.get('/:userid', function(req, res, next) {
});

var getAllActivity = function (res) {

};

var getActivity = function (userid, res) {

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
