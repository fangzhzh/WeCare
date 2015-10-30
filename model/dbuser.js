/**
 * Created by zhenfangzhang on 30/10/15.
 */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var userSchema = new Schema({
    userId: { type: String, required: true},
    userName: String,
    nickName: String,
    gender: Number, // 0 male, 1 Female, 2 other
    carer: [ {type: Schema.ObjectId, ref:'user'}  ],
    careGiver: [ {type: Schema.ObjectId, ref:'user'}  ],
    password: { type: String },
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        refreshToken : String
    },
    runkeeper           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

var Counter = mongoose.model('counter', CounterSchema);

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = User;

