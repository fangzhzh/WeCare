/**
 * Created by zhenfangzhang on 31/10/15.
 */
var express = require('express');
var router = express.Router();
var DBArticle = require('../model/dbarticle');
var recipe = require('../routes/recipe');

router.post('/', function(req, res, next) {
  console.log(__filename + ": " + __function__line);
  nudgeBuddy({userId:req.body.userid,
    buddyId:req.body.buddyid,
    message: req.body.message,
    queryString: "nudge",
    type: 1,
    url: req.body.url
  }, res);
});

var nudgeBuddy = function(nudge, res, callback) {
  console.log(__filename + ": " + __function__line);
  DBArticle.findOneAndUpdate(
      {queryString: nudge.queryString, link: nudge.url},
      nudge,
      {upsert:true, 'new': true},
      function (err, newArticle) {
        console.log(__filename + ": " + __function__line);
        if(err) {
          console.log(err);
          if(res)      res.sendStatus(500);
          return "";
        }
        console.log(__filename + ": " + __function__line);
        console.log(newArticle);
        var start = new Date();
        start.setHours(0,0,0,0);

        console.log(nudge);
        recipe.saveRecipe({"userid":nudge.buddyId, "recommendation":newArticle._id, dataTime: start},
        res);
      }
  );
  // save recipe

};

module.exports = router;
