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
  activity.getActivity(userid, function (err, activities) {
    if(err) {
      console.log(err);
      throw err;
    }

    activities.forEach(function(ex) {
      var date = [
        ex.user.age?parseInt(ex.user.age):30, // age
        ex.user.gender?parseInt(ex.user.gender):1, // gender
        ex.activity?parseFloat(ex.activity):0.8,
          ex.steps?parseInt(ex.steps):0,
          ex.calorie?parseFloat(ex.calorie):0
      ];
      console.log("=========> date"+date);
      var result = predict.predict(date);
      console.log("========> result" + result);
      
      var hashTag = article.shopeeTag2QueryString[result];
      article.getArticle(queryString, function(articles){
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
    });
  });
};

var fetchGoogleFit = function (userid) {
  User.findOne({userId:userid}, function(err, user) {
    if (err) throw err;

    console.log("HERE");
    var now = Date.now();
    for( i = 0; i < 90 ; ++i ) {
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
