/**
 * Created by zhenfangzhang on 30/10/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActivitySchema = new Schema({
    user:{type: Schema.ObjectId, ref:'user'},
    userId: String,
    dataTime:Date,
    createTime: { type: Date, default: Date.now },
    steps: Number,
    //distance: Number,
    calorie: Number,
    activity: Number
});

ActivitySchema.index({ userId: 1, dataTime: 1}, { unique: true });

var Activity = mongoose.model('activity', ActivitySchema);

// make this available to our users in our Node applications¡
module.exports = Activity;
