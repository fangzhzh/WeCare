/**
 * Created by zhenfangzhang on 30/10/15.
 */

var express  =require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Recipe = require('../model/dbrecipe');


router.get('/', function(req, res, next) {
  console.log(__function__line);
  Recipe.find({}, function(err, recipes) {
    if (err) throw err;
    // object of all the users
    console.log(recipes);
    res.send(recipes);
  });
});

router.get('/:userid', function(req, res, next) {
  console.log(__function__line);
  Recipe.findOne({userId:req.params.userid}, function(err, recipe) {
    if (err) throw err;
    // object of all the users
    console.log(recipe);
    res.send(recipe);
  });
});

var saveRecipe = function (recipe, res) {
  console.log(__function__line);
  var newRecipe = new Recipe();
  console.log(__function__line);
  newRecipe.userId = recipe.userid;
  newRecipe.recommendation = recipe.recommendation;
  newRecipe.dateTime = recipe.dateTime;
  console.log(__function__line);
  newRecipe.save(function (err) {
    if(err) {
      if(res)      res.send(500);
      console.log(err);
      return err;
    }
    console.log(__function__line+ newRecipe +  " save success");
    if(res)  res.send(200);
  });
  console.log(__function__line);
};


router.saveRecipe = saveRecipe;
module.exports = router;