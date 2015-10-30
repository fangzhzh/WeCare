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


var makeRecipe = function (userid) {
  var activities = activity.getActivity(userid);
  activities.forEach(function(ex) {
    var result = predict.predict(ex);
    console.log("========> result" + result);
    var queryString = article.tag2QueryString[result];
    article.getArticle(queryString, function(articles){
      articles.forEach(function(article){
        recipe.saveRecipe({"userid":userid, "recommendation":article._id, dateTime: Date.now});
        console.log(article);
      });
    });
  });
};

router.makeRecipe = makeRecipe;
module.exports = router;
