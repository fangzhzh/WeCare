/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Article = require('../model/dbarticle');


router.get('/', function(req, res, next) {

});

router.get('/:userid', function(req, res, next) {
});

var getAllArticle = function (res) {

};

var getArticle = function (userid, res) {

};

var saveArticle = function (article, res) {
  var newArticle = new Article();
  var jsonArticle = JSON.parse(article);
  newArticle.title = jsonArticle.title;
  newArticle.displayLink = jsonArticle.displayLink;
  newArticle.link = jsonArticle.link;
  newArticle.queryString = jsonArticle.queryString;
  newArticle.thumbUrl = jsonArticle.thumbUrl;


  newArticle.save(function (err) {
    if(err) {
      res.send(500);
      return next(err);
    }
    console.log(__function__line+ article +  " save success");
    res.send(200);
  });
};

module.saveArticle = saveArticle;
module.exports = router;
