/**
 * Created by zhenfangzhang on 30/10/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecipeScheme = new Schema( {
    userId: Number,
    recommendation: Number,
    sourceType: Number // system, user, developer
});

var Recipe = mongoose.model('recipe', RecipeScheme);
module.exports= Recipe;
