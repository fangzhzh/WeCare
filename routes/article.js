/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Article = require('../model/dbarticle');


router.get('/', function(req, res, next) {
	Article.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
        res.send(users);
    });
});

router.get('/:userid', function(req, res, next) {
});

var getAllArticle = function (res) {

};

var getArticle = function (userid, res) {

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
      return next(err);
    }
    console.log(__function__line+ article +  " save success");
    if(res) {
      res.send(200);
	}
  });
};

router.saveArticle = saveArticle;
module.exports = router;
