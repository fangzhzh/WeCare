/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express  =require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Activity = require('../model/dbactivity');

router.get('/', function(req, res, next) {
  getAllActivity(res);
});

router.get('/:userid', function(req, res, next) {
  var queryDic = {userId: req.params.userid, dataTime:
  {"$gte": req.query.starttime ? parseInt(req.query.starttime):new Date(0).getTime(),
      "$lt": req.query.endtime ? parseInt(req.query.endtime) : new Date().getTime()}};
  getActivity(queryDic, function (err, activity) {
    res.send(activity);
  });
});

var getAllActivity = function (res) {
  console.log(__filename + ": " + __function__line);
  Activity.find({}, function (err, activities) {
    if(err) {
      console.log(err);
      res.send("done");
      return;
    }
    res.send(activities);
  });
};

var getActivity = function (queryString, callback) {
  console.log(__filename + ": " + __function__line);
  console.log(queryString);
  Activity.find(queryString).sort({dataTime:1}).populate('user', 'age, gender').exec(function (err, activities) {
    if(err) {
      console.log(err);
      if(res) res.sendStatus(500);
      callback(err);
    }

    console.log(__filename + ": " + __function__line);
    if(callback) callback(null, activities);
  });

  //
  //var test = [
  //  [24, 1, 2.2, 9000, 346.7], //3
  //  [30, 0, 2, 5000, 46.7], //2
  //  [35, 1, 0.8, 10000, 246.7], //1
  //  [40, 0, 0.4, 2000, 80.3] //0
  //];
  //return test;
};


var saveActivity = function (activity, res) {
  console.log(__filename + ": " + __function__line);

  Activity.findOneAndUpdate({userId:activity.userId, dataTime:activity.dataTime},
      activity,
      {upsert:true},
      function (err, object) {
        if(err) {
          if(res)      res.send(500);
          return "";
        }
        if(res) res.send(200);
      }
  );
};


router.getActivity = getActivity;
router.saveActivity = saveActivity;
module.exports = router;