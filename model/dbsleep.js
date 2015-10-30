/**
 * Created by zhenfangzhang on 30/10/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SleepSchema = new Schema({
    userId: Number,
    dataTime: Date,
    createTime: { type: Date, default: Date.now },
    sleepTime: Number,
    deepSleepTime: Number
});

var Sleep = mongoose.model('sleep', SleepSchema);

module.exports= Sleep;
