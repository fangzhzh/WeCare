/**
 * Created by zhenfangzhang on 30/10/15.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HeartRateSchema = new Schema({
    userId: Number,
    dataTime:  Date,
    createTime: { type: Date, default: Date.now },
    heartRate: Number
});
var HeartRate = mongoose.model('heartrate', HeartRateSchema);
module.exports= HeartRate;


