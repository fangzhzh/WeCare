/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var Recommendatioin = require('../model/dbrecommendation');

/* get recommendation list*/
router.get('/', function(req, res, next){
    Recommendatioin.find({}, function (err, recommendations) {
        if(err) throw err;

        console.log();
    })
});