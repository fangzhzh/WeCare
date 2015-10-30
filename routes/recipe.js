/**
 * Created by zhenfangzhang on 30/10/15.
 */

var express  =require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Recipe = require('../model/dbrecipe');


router.get('/', function(req, res, next) {
  console.log(__function__line);
  res.send(0);
});

router.get('/:userid', function(req, res, next) {
});

var saveRecipe = function (recipe, res) {
  var newRecipe = new Recipe();
  newRecipe.userId = recipe.userId;
  newRecipe.recommendation = recipe.recommendation;
  newRecipe.dateTime = recipe.dateTime;
  newRecipe.save(function (err) {
    if(err) {
      res.send(500);
      return next(err);
    }
    console.log(__function__line+ newRecipe +  " save success");
    res.send(200);
  });
};


router.saveRecipe = saveRecipe;
module.exports = router;