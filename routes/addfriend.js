/**
 * Created by zhenfangzhang on 31/10/15.
 */
var express = require('express');
var router = express.Router();
var User = require('../model/dbuser');

router.post('/', function(req, res, next) {
  saveFriend({userId:req.query.userid, buddyId:req.query.buddyid}, res);
});


var saveFriend = function(user, res, callback) {
  console.log(__filename + ": " + __function__line);
  User.findOneAndUpdate(
      {userId:user.userId},
      {},
      //{$addToSet:{carer:user.buddyId}},
      function(err, me){
        console.log(__filename + ": " + __function__line);
        if(err) {
          console.log(err);
          if(res) res.sendStatus(500)
          if(callback) callback(err);
          return;b
        }
        User.findOneAndUpdate(
            {userId:user.buddyId},
            {},
            //{$addToSet:{careGiver:user.userId}},
            function(err, buddy) {
              console.log(__filename + ": " + __function__line);
              if (err) {
                console.log(err);
                if (res) res.sendStatus(500)
                if (callback) callback(err);
                return;
              }
              var index = me.carer.indexOf(buddy._id);
              if(index <= 0) {
                me.carer.push(buddy._id);
              }
              var index1 = buddy.careGiver.indexOf(me._id);
              if(index1 <= 0) {
                buddy.careGiver.push(me._id);
              }
              me.save();
              buddy.save();

              if (res) res.sendStatus(200);
              if (callback) callback(me);
        });
  });


};
module.exports = router;





