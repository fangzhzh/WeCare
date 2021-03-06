/**
 * Created by zhenfangzhang on 30/10/15.
 */

var express  =require('express');
var router = express.Router();
var Recipe = require('../model/dbrecipe');
var gcm = require('../jobs/gcm');
var User = require('../model/dbuser');


router.get('/', function(req, res, next) {
  console.log(__filename + ": " + __function__line);
  Recipe.find({}, function(err, recipes) {
    if (err) throw err;
    // object of all the users
    console.log(recipes);
    res.send(recipes);
  });
});

router.get('/:userid', function(req, res, next) {
  getRecipe({userId:req.params.userid}, res);
});

var getRecipe = function (queryString, res) {
  console.log(__filename + ": " + __function__line);
  Recipe.find(queryString).populate('recommendation').exec( function(err, recipe) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      throw err;
    }

    // object of all the users
    console.log(recipe.length + "'s recommendations");
    if(res) res.send(recipe);
  });
};

var saveRecipe = function (recipe, res) {
  console.log(__filename + ": " + __function__line);
  Recipe.findOneAndUpdate({userId:recipe.userid,
    recommendation:recipe.recommendation,
    dataTime:recipe.dataTime
    },
      recipe,
      {upsert:true},
      function (err, object) {
        if(err) {
          console.warn(err);
          if(res)      res.sendStatus(200);
          return "";
        }
        console.log("userId:" + recipe.userid);
        User.findOne({userId: recipe.userid}, function(err, user) {
          if (err) throw err;

          console.log(user);
          // object of all the users
          gcm.sendPush(user.gcmToken);
        });
        if(res) res.sendStatus(200);
      }
  );

  //
  //newRecipe.save(function (err) {
  //  if(err) {
  //    if(res)      res.send(500);
  //    console.log(err);
  //    return err;
  //  }
  //  console.log(__filename + ": " + __function__line+ newRecipe +  " save success");
  //  if(res)  res.send(200);
  //});

};

router.getRecipe = getRecipe;
router.saveRecipe = saveRecipe;
module.exports = router;
