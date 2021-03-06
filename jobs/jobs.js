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
var articleRecommend = require('../recommendation/article.js');
var articleAPI = new articleRecommend();


var fitnessAPI = new fitness();

var makeRecipe = function (userid) {
  activity.getActivity({userId:userid}, function (err, activities) {
      console.log(userid + " =====================>");
      console.log(activities[0] + " =====================>");
    if(err) {
      console.log(err);
      throw err;
    }

    if( activities.length <= 0) {
      return;
    }
    var age = activities[0].user.age?parseInt(activities[i].user.age):30;
    var gender = activities[0].user.gender?parseInt(activities[i].user.gender):1;
    var activity = 0.8;
    var steps = 5000;
    var calorie = 200;

    var counter = 0;
    for(i = activities.length-1; i >=0; --i) {
      var ex = activities[i];
      if(ex.activity) {
        activity = activity + parseFloat(ex.activity);
      } else {
        activity = activity + 0.8;
      }
      if(ex.steps) {
        steps = steps + parseInt(ex.steps);
      } else {
        steps = steps + 5000;
      }
      if(ex.calorie) {
        calorie = calorie + parseFloat(ex.calorie);
      } else {
        calorie = calorie + 2000;
      }
      console.log("-------->>>>", steps, calorie);
      counter++;
      if(counter >= 6) {
        break;
      }
    }
    var avg_activity = activity / counter;
    var avg_steps = steps / counter;
    var avg_calorie = (avg_steps / 5000) * 200 ;
    console.log("-------->>>>", avg_steps, avg_calorie);

    predictMakeRecipe(userid, [age, gender, avg_activity, avg_steps, avg_calorie]);
  });
};

var predictMakeRecipe = function(userid,  data ) {
  console.log("=========> date"+data);
  var result = predict.predict(data);
  console.log("========> result" + result);


  var hashTag = article.shopeeTag2QueryString[result];
  article.getArticle(hashTag, function(articles){
    if(articles.length <= 0) {
      article.saveArticle({
        thumbUrl: 'http://shopee.sg/static/images/pc/en/topBannerBg.png',
        title: '#'+hashTag,
        summary: '',
        link: 'http://mall.shopee.sg/category-item/?is_hashtag=1&search=%23' + hashTag,
        displayLink: "Shopee Recommendation",
        queryString: hashTag
      });
      return;
    }
    recipe.saveRecipe({"userid":userid, "recommendation":articles[0]._id, dataTime: Date.now()});
  });

  var queryString = article.tag2QueryString[result];
  article.getArticle(queryString, function(articles){
    if(articles.length <= 0) {
      console.log("article size "+articles.size);
      articleAPI.search(queryString);
      return;
    }

    articles.forEach(function(article){
      recipe.saveRecipe({"userid":userid, "recommendation":article._id, dataTime: Date.now()});
    });
  });
};

var fetchGoogleFit = function (userid) {
  User.findOne({userId:userid}, function(err, user) {
    if (err) throw err;

    console.log(__filename + ": " + __function__line);

    var now = Date.now();
    lastFitDataDate = 0;
    console.log("now: " + now + ", lastFitDataDate:" + lastFitDataDate + " , timeWindow:" + timeWindow);
    if(now > lastFitDataDate + timeWindow) {
      for( i = 0; i < 30 ; ++i ) {
        fitnessAPI.fetchData(user, now);
        now = new Date(now);
        now.setDate(new Date(now).getDate() - 1 );
      }
      return user;
    }

  });
};
var timeWindow = 60*1000*60*3;
var lastFitDataDate = 0;
router.lastFitDataDate = lastFitDataDate;
router.makeRecipe = makeRecipe;
router.fetchGoogleFit = fetchGoogleFit;
module.exports = router;
