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
  getRecipe({userId:req.params.userid});
});


var getRecipe = function (queryString, res) {
  Recipe.find(queryString, function(err, recipe) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      throw err;
    }

    // object of all the users
    console.log(recipe);
    res.send(recipe);
  });
};

var saveRecipe = function (recipe, res) {
  var newRecipe = new Recipe();
  newRecipe.userId = recipe.userid;
  newRecipe.recommendation = recipe.recommendation;
  newRecipe.dateTime = recipe.dateTime;

  newRecipe.save(function (err) {
    if(err) {
      if(res)      res.send(500);
      console.log(err);
      return err;
    }
    console.log(__function__line+ newRecipe +  " save success");
    if(res)  res.send(200);
  });

};

router.getRecipe = getRecipe;
router.saveRecipe = saveRecipe;
module.exports = router;