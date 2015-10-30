/**
 * Created by zhenfangzhang on 30/10/15.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wecare');
var Schema = mongoose.Schema;

var HealthBoxSchema = new Schema({
    createTime:  { type: Date, default: Date.now },
    stepsLevel: Number, // 0 normal, 1 average, 2 above
    distanceLevel: Number, // 0 low 1 average 2 above
    activity: Number,  // 0 low 1 average 2 above
    sleepTime: Number, // 0 low 1 average 2 above
    sleepQuality: Number // 0 low 1 average 2 above
});

var HealthBox = mongoose.mode('healthbox');
module.exports = HealthBox;
