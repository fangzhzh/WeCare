/**
 * Created by zhenfangzhang on 30/10/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecipeScheme = new Schema( {
    userId: String,
    recommendation: {type: Schema.ObjectId, ref:'article'},
    dataTime : Date,
    sourceType: Number // system, user, developer
});

RecipeScheme.index({ recommendation: 1, userId: 1}, { unique: true });
var Recipe = mongoose.model('recipe', RecipeScheme);
module.exports= Recipe;
