/**
 * Created by zhenfangzhang on 30/10/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  thumbUrl:String,
  title: String,
  link: String,
  summary: String,
  displayLink: String,
  queryString: String
});

var Article = mongoose.model('article', ArticleSchema);
module.exports= Article;
