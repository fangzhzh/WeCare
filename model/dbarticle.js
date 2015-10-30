/**
 * Created by zhenfangzhang on 30/10/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  type: {type:Number, default: 0},
  thumbUrl:String,
  title: String,
  link: {type:String,unique:true},
  summary: String,
  displayLink: String,
  queryString: String
});

ArticleSchema.index({ queryString: 1, link: 1}, { unique: true });
var Article = mongoose.model('article', ArticleSchema);
module.exports= Article;
