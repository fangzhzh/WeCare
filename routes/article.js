/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var Article = require('../model/dbarticle');


router.get('/', function(req, res, next) {
	Article.find({}, function(err, users) {
        if (err) throw err;            
        res.send(users);
    });
});

var getArticle = function( queryString, callback) {
  Article.find({"queryString":queryString}, function (err, articles) {
    if(err) throw err;

    callback(articles);
  })
};

var saveArticle = function (article, res) {
  var newArticle = new Article();
  var jsonArticle = article;
  newArticle.title = jsonArticle.title;
  newArticle.displayLink = jsonArticle.displayLink;
  newArticle.link = jsonArticle.link;
  newArticle.queryString = jsonArticle.queryString;
  newArticle.thumbUrl = jsonArticle.thumbUrl;
  newArticle.summary = jsonArticle.sumary;

  newArticle.save(function (err) {
    if(err) {
      if(res) {
        res.send(500);
      }
      //return next(err);
    }
    console.log(__filename + ": " + __function__line+ article +  " save success");
    if(res) {
      res.send(200);
	}
  });
};

var tag2QueryString = {
  0: 'start exercising tips',
  1: 'short workout plan',
  2: 'best beginners workout',
  3: 'pro exercise advice',
};

var shopeeTag2QueryString = {
  0: 'health',
  1: 'gym',
  2: 'backpack',
  3: 'run',
};

router.tag2QueryString = tag2QueryString;
router.shopeeTag2QueryString = shopeeTag2QueryString;
router.getArticle = getArticle;
router.saveArticle = saveArticle;
module.exports = router;
