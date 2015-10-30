/**
 * Created by zhenfangzhang on 30/10/15.
 */


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wecare');
var Schema = mongoose.Schema;
var RecipeScheme = new Schema( {
    userId: Number,
        recommendation: Number,
        sourceType: Number // system, user, developer
});

