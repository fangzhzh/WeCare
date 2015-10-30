/**
 * Created by zhenfangzhang on 30/10/15.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wecare');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var userSchema = new Schema({
    userId: { type: Number, required: true, unique: true},
    userName: String,
    nickName: String,
    gender: Number, // 0 male, 1 Female, 2 other
    carer: [ Number ],
    careGiver: [ Number ],
    password: { type: String, required: true },
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now },
    google: {
        name: String,
        toke: String,
        userid: String
    },
    fibit: {
        name: String,
        toke: String,
        userid: String

    },
    apple: {
        name: String,
        toke: String,
        userid: String

    }
});

var Counter = mongoose.model('counter', CounterSchema);

userSchema.pre('validate', function(next) {
    var user = this;
    Counter.findByIdAndUpdate({_id:'user_id'}, {$inc: { seq: 1} }, function(error, counter1)   {
        if(error)
            return next(error);
        console.log(counter1);
        if (counter1){
            user.user_id = counter1.seq;
            next();
        }
    });
});

var User = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = User;

