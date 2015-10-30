/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var activity = require('../routes/activity');
var predict = require('../routes/predictor');
var article = require('../routes/article');
var recipe = require('../routes/recipe');
var fitness = require('../integration/googleFit.js');
var User = require('../model/dbuser');

var fitnessAPI = new fitness();

var makeRecipe = function (userid) {
  activity.getActivity(userid, function (err, activities) {
    if(err) {
      console.log(err);
      throw err;
    }

    activities.forEach(function(ex) {
      var date = [
        ex.user.age?30:parseInt(ex.user.age), // age
        ex.user.gender?1:parseInt(ex.user.gender), // gender
        ex.activity?0.8:parseFloat(ex.activity),
          ex.steps?0:parseInt(ex.steps),
          ex.calorie?0:parseFloat(ex.calorie)
      ];
      console.log("=========> date"+date);
      var result = predict.predict(date);
      console.log("========> result" + result);
      var queryString = article.tag2QueryString[result];
      article.getArticle(queryString, function(articles){
        articles.forEach(function(article){
          recipe.saveRecipe({"userid":userid, "recommendation":article._id, dateTime: Date.now});
          console.log(article);
        });
      });
    });
  });

};

var fetchGoogleFit = function (userid) {
  User.findOne({userId:userid}, function(err, user) {
    if (err) throw err;

    var now = Date.now();
    for( i = 0; i < 90 ; ++i ){
      fitnessAPI.fetchData(user, now);
      now = new Date(now);
      now.setDate(new Date(now).getDate() - 1 );
    }
    return user;
  });
};

router.makeRecipe = makeRecipe;
router.fetchGoogleFit = fetchGoogleFit;
module.exports = router;
