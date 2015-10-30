/**
 * Created by zhenfangzhang on 31/10/15.
 */
var express = require('express');
var router = express.Router();
var DBArticle = require('../model/article');
var Article = require('../model/dbarticle');

router.post('/', function(req, res, next) {
  nudge({userId:req.query.userid,
    buddyId:req.query.buddyid,
    message: req.query.message,
    url: req.query.url
  }, res);
});

var nudge = function(recipe, res, callback) {
  var newArticle = new Article();

  Article.saveArticle({
    thumbUrl: recipe.url,
        title: recipe.title,
        summary: recipe.message,
        link: recipe.url,
        displayLink: entry.displayLink,
        queryString: query
  });
};

module.exports = router;
